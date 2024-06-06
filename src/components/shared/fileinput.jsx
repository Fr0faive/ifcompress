export default function FileInput({ handleOnChange, id, label, accept }) {
  return (
    <div className="border-2 border-dashed rounded-2xl border-gray-400 p-3 w-fit flex justify-center items-center flex-col">
      <label htmlFor={id} className="cursor-pointer text-slate-800">
        {label}
      </label>
      <input
        type="file"
        id={id}
        accept={accept}
        onChange={handleOnChange}
        style={{ display: "none" }}
        onInput={handleOnChange}
      />
    </div>
  );
}
