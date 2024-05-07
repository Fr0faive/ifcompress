export default function About() {
  return (
    <main className="w-full p-4 h-screen">
      <div className="w-full flex justify-center items-center flex-col gap-3">
        <h1 className="text-3xl font-semibold">Tentang</h1>
        <table>
          <tbody>
            <tr>
              <td className="w-1/5">
                <b>Nama</b>
              </td>
              <td className="w-1/5">:</td>
              <td className="w-3/5">Faikar Moch. Tajudin</td>
            </tr>
            <tr>
              <td>
                <b>NIM</b>
              </td>
              <td>:</td>
              <td>1217050052</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
