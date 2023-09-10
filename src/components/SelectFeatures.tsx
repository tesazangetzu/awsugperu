import * as React from "react";

interface IListFeature {
  id: string;
  name: string;
  type: string;
}

interface ISelected {
  listFeature: IListFeature[] | undefined;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectFeature = ({ listFeature, setSelected }: ISelected) => {
  return (
    <select
      className="block m-auto mb-5 px-5 py-3 border rounded-md"
      onChange={(e) => {
        setSelected(e.target.value);
      }}
    >
      <option value="-1">Select Feature</option>
      {listFeature?.map((item, key) => (
        <option value={item.id} key={key}>
          {item.name}
        </option>
      ))}
    </select>
  );
};
