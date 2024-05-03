export default function FileInput({ handleOnChange, label, accept }) {
  return (
    <div className="border-2 border-dashed rounded-2xl border-gray-400 p-4 w-fit cursor-pointer">
      <label htmlFor="input-file" className="cursor-pointer text-slate-800">
        {label}
      </label>
      <input
        type="file"
        id="input-file"
        accept={accept}
        onChange={handleOnChange}
        style={{ display: "none" }}
      />
    </div>
  );
}
