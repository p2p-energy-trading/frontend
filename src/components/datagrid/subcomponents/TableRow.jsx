import React from "react";
import { forwardRef } from "react";

const TableRow = forwardRef(
  (
    {
      data,
      index,
      indexPaginated,
      indexWidth,
      columnWidths = [],
      showCheckbox,
      checked,
      onCheckboxChange,
      height,
    },
    ref
  ) => {
    return (
      <tr
        ref={ref}
        className={indexPaginated % 2 === 0 ? "bg-base-100" : "bg-base-100"}
        key={data[0]}
        style={{ height: height ? `${height}px` : undefined }}
      >
        {showCheckbox && (
          <td className="py-2 pl-4 pr-0 leading-0">
            <input
              className="checkbox checkbox-primary checkbox-xs "
              type="checkbox"
              checked={checked}
              onChange={onCheckboxChange}
            />
          </td>
        )}
        <th
          className="py-2 pl-4 mr-2 "
          style={{ minWidth: indexWidth, maxWidth: indexWidth }}
        >
          {index + 1}
        </th>

        {data.map((item, colIdx) => {
          if (colIdx === 0) return null;

          const cellStyle = columnWidths[colIdx - 1]
            ? {
                minWidth: columnWidths[colIdx - 1],
                maxWidth: columnWidths[colIdx - 1],
              }
            : {};

          if (typeof item === "object") {
            if (item.decorator == "link") {
              return (
                <td key={colIdx} className="py-2 px-2" style={cellStyle}>
                  <a
                    href={item.text || "#"}
                    className="text-primary hover:underline"
                    rel="noopener noreferrer"
                  >
                    {item.text}
                  </a>
                </td>
              );
            }

            if (item.decorator && item.decorator.avatar) {
              return (
                <td key={colIdx} className="py-2 px-2" style={cellStyle}>
                  <div className="flex items-center gap-2">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={item.decorator.avatar.src} alt="Avatar" />
                      </div>
                    </div>
                    {item.text}
                  </div>
                </td>
              );
            }
            if (item.decorator && item.decorator.status) {
              return (
                <td key={colIdx} className="py-2 px-2" style={cellStyle}>
                  <div className="flex items-center gap-2">
                    <div className="inline-grid *:[grid-area:1/1]">
                      {item.decorator.status.type === "success" ? (
                        <div className="status status-success animate-none"></div>
                      ) : item.decorator.status.type === "warning" ? (
                        <div className="status status-warning animate-pulse"></div>
                      ) : item.decorator.status.type === "error" ? (
                        <>
                          <div className="status status-error animate-ping"></div>
                          <div className="status status-error "></div>
                        </>
                      ) : (
                        <>
                          <div className="status status-info"></div>
                        </>
                      )}
                    </div>
                    {item.decorator.status.badge ? (
                      item.decorator.status.type === "success" ? (
                        <p className={`badge badge-success`}>{item.text}</p>
                      ) : item.decorator.status.type === "warning" ? (
                        <p className={`badge badge-warning`}>{item.text}</p>
                      ) : item.decorator.status.type === "error" ? (
                        <p className={`badge badge-error`}>{item.text}</p>
                      ) : (
                        <p className={`badge badge-info`}>{item.text}</p>
                      )
                    ) : (
                      <p className="">{item.text}</p>
                    )}
                  </div>
                </td>
              );
            }
            return (
              <td key={colIdx} className="py-2 px-2" style={cellStyle}>
                {item.text}
              </td>
            );
          }
          return (
            <td key={colIdx} className="py-2 px-2" style={cellStyle}>
              {item}
            </td>
          );
        })}
      </tr>
    );
  }
);

export default TableRow;
