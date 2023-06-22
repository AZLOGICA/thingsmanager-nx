import { useState, useEffect } from 'react';

import dynamic from 'next/dynamic';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';

function Report() {
  const [token, setToken] = useState<null | string>(null);
  const [embedURL, setEmbedURL] = useState<null | string>(null);
 const [reportId, setReportId] = useState<null | string>(null)
  const getToken = async () => {
    await fetch('https://api3.azlogica.com/graphql/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `mutation AzureToken($clientId: String){
                azureToken(clientId: $clientId) 
              }`,
        variables: {
          clientId: 'e700697c-e007-4f18-9993-08f9e0a3cde8',
        },
      }),
    })
      .then((res) => res.json())
      .then( async (res) => {
        if (res.data?.azureToken) {
          const _token = JSON.parse(res.data.azureToken);
         // setToken(_token.access_token);
          console.log('tokem', _token.access_token);
          console.log(res.data);
          const resp = await getReport(_token.access_token, "da1e5948-2ad6-4293-befc-58edb64e841b");
        }
     
      });
  };

  const getReport = async (token, reportId) => {

    const rawResponse = await fetch('https://api.powerbi.com/v1.0/myorg/reports/' + reportId, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer' + ' ' + token,
          'Content-Type': 'application/json'
        },
       // body: JSON.stringify(formData)
      });
      const content = await rawResponse.json();
      console.log("getReport", content);
      if(content?.id){
        setReportId(content.id)
        setEmbedURL(content.embedUrl)
        const resp2 = await generateToken(reportId, token,content)
      }

  }

  const  generateToken = async (report_id, token, embedData) => {

    const formData = {
        "datasets": [{
          "id": embedData['datasetId'] //dataSetId
        }],
        "reports": [{
          "id": embedData['id'] //id
        }]
      };

    const rawResponse = await fetch('https://api.powerbi.com/v1.0/myorg/GenerateToken', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer' + ' ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const content = await rawResponse.json();
      console.log("content", content);
      setToken(content.token)

  }

  useEffect(() => {
    getToken();
  }, []);
  //https://app.powerbi.com/reportEmbed?reportId=2a30a3c9-785a-41e8-bcb1-03ba979f9287&groupId=57b67659-a523-47a3-a14b-7644f8d0589b&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVBBQVMtMS1TQ1VTLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d
  //"{"token_type":"Bearer","scope":"App.Read.All Capacity.Read.All Capacity.ReadWrite.All Content.Create Dashboard.Read.All Dashboard.ReadWrite.All Data.Alter_Any Dataflow.Read.All Dataflow.ReadWrite.All Dataset.Read.All Dataset.ReadWrite.All Gateway.Read.All Gateway.ReadWrite.All Group.Read Group.Read.All Metadata.View_Any Report.Read.All Report.ReadWrite.All StorageAccount.Read.All StorageAccount.ReadWrite.All Tenant.Read.All Tenant.ReadWrite.All UserState.ReadWrite.All Workspace.Read.All Workspace.ReadWrite.All","expires_in":"4400","ext_expires_in":"4400","expires_on":"1687387814","not_before":"1687383113","resource":"https://analysis.windows.net/powerbi/api","pwd_exp":"327430","pwd_url":"https://portal.microsoftonline.com/ChangePassword.aspx","access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZTczZjVjOTUtZmIwNC00ZmU1LThkZDAtMmFjNTZjZjNiMmYyLyIsImlhdCI6MTY4NzM4MzExMywibmJmIjoxNjg3MzgzMTEzLCJleHAiOjE2ODczODc4MTQsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUFZQnFqa2c1bzRnRHBpQTZ1M05GL3VHNThPK3o2K1BHcVBSL2FJc1RKeVFROGttenFOdjg1cDExQUdCMjg5d0xmIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6ImU3MDA2OTdjLWUwMDctNGYxOC05OTkzLTA4ZjllMGEzY2RlOCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiSW50ZWxpZ2VudGUyIiwiZ2l2ZW5fbmFtZSI6IlJlcG9ydGVyaWEiLCJpcGFkZHIiOiIxMDcuMjMuNjYuMTMyIiwibmFtZSI6IlJlcG9ydGVyaWEgSW50ZWxpZ2VudGUyIiwib2lkIjoiM2E2NGViM2YtZDJjOS00YzEwLWIxNWMtMmU3ODgzY2MyNzE3IiwicHVpZCI6IjEwMDMyMDAwOUQzMUY0REIiLCJwd2RfZXhwIjoiMzI3NDMwIiwicHdkX3VybCI6Imh0dHBzOi8vcG9ydGFsLm1pY3Jvc29mdG9ubGluZS5jb20vQ2hhbmdlUGFzc3dvcmQuYXNweCIsInJoIjoiMC5BVFFBbFZ3XzV3VDc1VS1OMENyRmJQT3k4Z2tBQUFBQUFBQUF3QUFBQUFBQUFBQTBBRzQuIiwic2NwIjoiQXBwLlJlYWQuQWxsIENhcGFjaXR5LlJlYWQuQWxsIENhcGFjaXR5LlJlYWRXcml0ZS5BbGwgQ29udGVudC5DcmVhdGUgRGFzaGJvYXJkLlJlYWQuQWxsIERhc2hib2FyZC5SZWFkV3JpdGUuQWxsIERhdGEuQWx0ZXJfQW55IERhdGFmbG93LlJlYWQuQWxsIERhdGFmbG93LlJlYWRXcml0ZS5BbGwgRGF0YXNldC5SZWFkLkFsbCBEYXRhc2V0LlJlYWRXcml0ZS5BbGwgR2F0ZXdheS5SZWFkLkFsbCBHYXRld2F5LlJlYWRXcml0ZS5BbGwgR3JvdXAuUmVhZCBHcm91cC5SZWFkLkFsbCBNZXRhZGF0YS5WaWV3X0FueSBSZXBvcnQuUmVhZC5BbGwgUmVwb3J0LlJlYWRXcml0ZS5BbGwgU3RvcmFnZUFjY291bnQuUmVhZC5BbGwgU3RvcmFnZUFjY291bnQuUmVhZFdyaXRlLkFsbCBUZW5hbnQuUmVhZC5BbGwgVGVuYW50LlJlYWRXcml0ZS5BbGwgVXNlclN0YXRlLlJlYWRXcml0ZS5BbGwgV29ya3NwYWNlLlJlYWQuQWxsIFdvcmtzcGFjZS5SZWFkV3JpdGUuQWxsIiwic3ViIjoiLXBLekNhWkE3bG1WZTRVV2dGNnByYnZ5a3FzYTZWVWZtSjR2T095aGg2RSIsInRpZCI6ImU3M2Y1Yzk1LWZiMDQtNGZlNS04ZGQwLTJhYzU2Y2YzYjJmMiIsInVuaXF1ZV9uYW1lIjoicmVwb3J0ZXJpYS5jZW50cmFsMkBhemxvZ2ljYS5jb20iLCJ1cG4iOiJyZXBvcnRlcmlhLmNlbnRyYWwyQGF6bG9naWNhLmNvbSIsInV0aSI6IlZIX3I4Q0hJbjBxQTVIdldwXy1pQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfcGwiOiJlbi1VUyJ9.FYK3Wm_qhpCLgn4Vg0GdIw3Ngog-zd41Ybsx0rRc6DbfhuVIpj9MFDl81Czh0jJyUJMCRulEABm-a7PIB0ZF6rRvO53f-AYnn4NfTWpOzuJ_m9U-HmtDFZYdv1OunqDs2bTzvsSB8f5TkvjELILcqcvlWq713AjkaPV-ptT45lzA36sP5BRkVk1ADc0uyQT6m3XLPrYs2x7cmpgAzuqwC_hHCtUqjkBM-a-z-uHXa5iu66Jp_AitKj0kx92oR-QPrwB90bLzEEytywOdQ24WNc82xPM7rypvPfou1Q9ZeP_X3RZGjZbsrG-aB3mtwusnqjpgkTNKCrxRao5DTp_ySA","refresh_token":"0.ATQAlVw_5wT75U-N0CrFbPOy8nxpAOcH4BhPmZMI-eCjzeg0AG4.AgABAAEAAAD--DLA3VO7QrddgJg7WevrAgDs_wUA9P9Q9VomLgyNt2QqRu-VID1nVeGNgF9eLyT3cYpooktVBjU67NWSlDskQoHrz2V_ANeIZN6qy8HPLKiVtOtpyHvI0eTncTpChkU6Xp-2l6rgsKZNsWdS7AM0K8oOLxHdwOhtHrbxDgqF7gLUqaVkv-enBKctZQgZCAC7KOBCh8W8ZErvNxRCzwjvBTCnh0WrJ1H1WPj3RI0n5yhYdNOXU8lpVV8wD4WdTjk8p9SAncdwyaa4c_7wmW6Fpv_M__Dl6_m5LJxKcvrammZD9-Q8LvX72ULo-fVBSUy8oWiep5MpUWASzM3-znkxdAXlio5-4PCjnIJIW16IRANbgqMNQFbtebZq8wCuc0MbEB4w2Lf8v8B4fymr6jOcUZkrd-E8skqJHNj-rOKU6uA8y_WwS4K5Vkn8MVs5zIYJvHpmPCALSuXdXTKMvcxerBtWV02oulAEujnzt2DruM39LRJW4UfAXR-rOH70BQD0ZYlczbGq0BbxVfLfDkoLD1o2hEgIG1jwRJQRfw5Fw1I4qjX7CG8wgZLiK1VJ54ntbYIsTAHCL55K2oeLgScYdazgU-EZb7zvLSJGJ-JAOh0nrgRXTC23sL84XqlGWyp3MG9ugatV6kvzlXYaL1jTSMgygDh3ojJr8vVoYAHx6lvrIxGQNvBBlDPDEBKq10Wk9FIoH7_TEg8g9GWs1OxOCWawCnJH-v13wakuOcy9U17KUfUt78Rn"}"
  return (
    <>
      {token && embedURL &&(
        <PowerBIEmbed
          embedConfig={{
            type: 'report', // Supported types: report, dashboard, tile, visual, qna, paginated report and create
            id: reportId,
            embedUrl: embedURL,
            accessToken: token,
            tokenType: models.TokenType.Embed, // Use models.TokenType.Aad for SaaS embed
            settings: {
              panes: {
                filters: {
                  expanded: false,
                  visible: false,
                },
              },
              background: models.BackgroundType.Transparent,
            },
          }}
          eventHandlers={
            new Map([
              [
                'loaded',
                function () {
                  console.log('Report loaded');
                },
              ],
              [
                'rendered',
                function () {
                  console.log('Report rendered');
                },
              ],
              [
                'error',
                function (event) {
                  console.log(event.detail);
                },
              ],
              ['visualClicked', () => console.log('visual clicked')],
              ['pageChanged', (event) => console.log(event)],
            ])
          }
          cssClassName={'h-[93vh]'}
          getEmbeddedComponent={(embeddedReport) => {
            var report = null;
            report = embeddedReport as any;
          }}
        />
      )}
    </>
  );
}

export default Report;
