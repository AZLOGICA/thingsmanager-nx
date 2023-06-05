export const  parseDate = (date: any) => {
    const offset = new Date().getTimezoneOffset();
    let yourDate: any = new Date(new Date(date).getTime() - offset * 60 * 1000);
    return yourDate.toISOString().slice(0, 19).replace('T', ' ');
  };

 export const parseMicrosecondsDate = (value: any) => {
    const microseconds = parseInt(value);
    const microseconds_to_seconds = microseconds / 1000;
    return parseDate(microseconds_to_seconds);
 }

 export const parseMicrosecondsAsDate = (value: any) => {
    const microseconds = parseInt(value);
    const microseconds_to_seconds = microseconds / 1000;
    const offset = new Date().getTimezoneOffset();
   // let yourDate: any = new Date(new Date(microseconds_to_seconds).getTime() - offset * 60 * 1000);
   let yourDate: any = new Date(microseconds_to_seconds)
    return yourDate;
 }