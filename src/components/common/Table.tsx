import type { ReactNode } from "react";

interface TableProps {
  ths: string[];
  tds: ReactNode[][];
}

const Table = ({ tds, ths }: TableProps) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full">
        <thead className="text-[#767676] text-xs bg-[#CFCFCF] [&_th]:py-1 [&_th]:px-2 [&_th]:break-keep border-b border-[#A0A0A0] [&_th]:border-r [&_th]:last:border-none [&_th]:border-[#A0A0A0]">
          <tr>
            {ths.map((th, index) => (
              <th key={index}>{th}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-xs font-medium bg-[#F9F9F9] [&_td]:py-1 [&_td]:px-2 [&_td]:break-keep [&_td]:border-r [&_td]:border-[#CFCFCF] [&_td]:last:border-none text-center">
          {tds.map((td, tdIndex) => (
            <tr key={tdIndex}>
              {td.map((data, tdIndex) => (
                <td key={tdIndex}>{data}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
