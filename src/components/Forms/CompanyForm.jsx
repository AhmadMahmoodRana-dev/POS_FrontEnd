import { Context } from "@/context/Context";
import { useContext } from "react";

export default function CompanyForm() {
  const { companyFormData, setCompanyFormData, postData, showCompanyButton,UpdateData } =
    useContext(Context);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showCompanyButton) {
      UpdateData();
    } else {
      postData();
    }
    console.log("Form Data Submitted:", companyFormData);
  };

  return (
    <form
      className="w-full justify-center items-center flex min-h-screen h-auto bg-white"
      onSubmit={handleSubmit}
    >
      <div className="space-y-12 w-[70%]">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {[
              { label: "Company Name", name: "companyName" ,type: "text" },
              { label: "Company Desc", name: "companyDesc" ,type: "text" },
              { label: "Address", name: "address" ,type: "text" },
              { label: "UAN", name: "uan" ,type: "text" },
              { label: "Email", name: "email",type: "email" },
              { label: "City", name: "city" ,type: "text" },
              { label: "Country", name: "country" ,type: "text" },
              { label: "URL", name: "url" ,type: "text" },
              { label: "NTN", name: "ntn" ,type: "text" },
              { label: "STN", name: "stn" ,type: "text" },
              { label: "Phone No", name: "phoneNo" ,type: "number" },
              { label: "Fax No", name: "faxNo" ,type: "text" },
            ].map((field) => (
              <div key={field.name} className="sm:col-span-3">
                <label
                  htmlFor={field.name}
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  {field.label}
                </label>
                <div className="mt-2">
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={companyFormData[field.name] || ""} // Ensure value is not undefined
                    onChange={handleChange}
                    autoComplete="off"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          {showCompanyButton ? (
            <button
              type="submit"
              className="bg-black text-white px-3 py-2 rounded-md"
            >
              Update
            </button>
          ) : (
            <button
              type="submit"
              className="bg-black text-white px-3 py-2 rounded-md"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
