import React, { useMemo } from "react";
import SidebarItem from "../../sidebar/sidebar-item";
import { AiOutlineEdit } from "react-icons/ai";

const TableTitleGoTo = ({ cell }: any) => {

    const onClickIconButton = (action: string) => {
        console.log("aaaaaaa", cell)

      //  if (action == 'edit') return navigate(cell.column.editRoute + cell.row.original.id)
        //  dispatch(startSelectedElement({ row: cell.row.original }));
        //  dispatch(startInModal({ inModal: action }));
    };

    const deleteItem = () => {
       
    }

    return (
        <>
        <SidebarItem
            className="w-16"
            active={false}
            icon={<AiOutlineEdit/>}
            name="Editar"
            link={'/admin/admin/edit/'+ cell.row.original.id}
        />

          
        </>
    );
};

export default TableTitleGoTo;