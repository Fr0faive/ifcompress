export default function FileInput({ handleOnChange }) {
  return (
    <div className="border-2 border-dashed rounded-2xl border-gray-400 p-4 w-fit cursor-pointer">
      <label htmlFor="input-file" className="cursor-pointer">
        Select Image
      </label>
      <input
        type="file"
        id="input-file"
        accept="image/*"
        onChange={handleOnChange}
        style={{ display: "none" }}
      />
    </div>
  );
}
