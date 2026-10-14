
type SearchFormProps = {
  search?: string;
  major?: string;
  status?: string;
};

export default function SearchForm({
  search = "",
  major = "",
  status = "",
}: SearchFormProps) {
  return (
    <form
      method="GET"
      className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-2">
          <label
            htmlFor="search"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            ค้นหานักศึกษา
          </label>
          <input
            id="search"
            name="search"
            type="text"
            defaultValue={search}
            placeholder="ค้นหารหัสนักศึกษาหรือชื่อ..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label
            htmlFor="major"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            สาขา
          </label>
          <select
            id="major"
            name="major"
            defaultValue={major}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
          >
            <option value="">ทุกสาขา</option>
            <option value="ib">
              IB
            </option>
            <option value="cis">CIS</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            สถานะ
          </label>
          <select
            id="status"
            name="status"
            defaultValue={status}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
          >
            <option value="">ทั้งหมด</option>
            <option value="active">กำลังศึกษา</option>
            <option value="inactive">พ้นสภาพ</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          ค้นหา
        </button>

        <a
          href="/students"
          className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-50"
        >
          ล้างตัวกรอง
        </a>
      </div>
    </form>
  );
}
