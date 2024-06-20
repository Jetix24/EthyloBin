"use client";

import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineGroupAdd } from "react-icons/md";
import ButtonAddZone from "@/components/ButtonAddZone";



interface ZoneListProps {
 // zonas?: Zonas[]
}

const ZoneList: React.FC = ({

}) => {

  return (
    <>
      <aside
        className="
          fixed
          inset-y-0
          pb-20
          lg:pb-0
          lg:left-20
          lg:w-80
          lg:block
          overflow-y-auto
          border-r
          border-gray-200
        "
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="
              text-2xl
              font-bold
              text-neutral-800
            ">
              Zonas
            </div>
            
          </div>
          {/*}
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))} */}
        
        <div className="">
              <ButtonAddZone />
        </div>
        </div>
      </aside>
    </>
   );
}
 
export default ZoneList;