import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineSpeed } from "react-icons/md";
import { toast } from "react-toastify";

export const Context = createContext();

const ContextProvider = (props) => {
  const navigate = useNavigate();

  // COMPANY APIS HANDLING
  const [companiesData, setCompaniesData] = useState([]);
  const [companyFormData, setCompanyFormData] = useState({
    companyName: "",
    companyDesc: "",
    address: "",
    uan: "",
    email: "",
    city: "",
    country: "",
    url: "",
    ntn: "",
    stn: "",
    phoneNo: "",
    faxNo: "",
  });
  const [showCompanyButton, setShowCompanyButton] = useState(false);
  const [updateCompanyId, setUpdateComapnyId] = useState("");

  // COMPANIES GET API
  const getData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/companies`);
      setCompaniesData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // COMPANIES POST API
  const postData = async () => {
    try {
      console.log("Sending data: ", companyFormData); // Log the data
      await axios.post(`http://localhost:5000/api/companies`, {
        COMPANY_NAME: companyFormData.companyName,
        COMAPNY_SHORT_DESC: companyFormData.companyDesc,
        ADDRESS: companyFormData.address,
        UAN: companyFormData.uan,
        EMAIL: companyFormData.email,
        CITY: companyFormData.city,
        COUNTRY: companyFormData.country,
        CREATED_BY: "1",
        LAST_UPDATED_BY: "1",
        URL: companyFormData.url,
        NTN: companyFormData.ntn,
        STN: companyFormData.stn,
        PHONE_NO: companyFormData.phoneNo,
        FAX_NO: companyFormData.faxNo,
      });
      setCompanyFormData({
        companyName: "",
        companyDesc: "",
        address: "",
        uan: "",
        email: "",
        city: "",
        country: "",
        url: "",
        ntn: "",
        stn: "",
        phoneNo: "",
        faxNo: "",
      });
      navigate("/");
      getData();
      toast.success("Company created successfully!");
    } catch (error) {
      toast.error("Error creating Company!");

      console.error(
        "Error posting data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // COMPANIES DELETE API
  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/companies/${id}`);
      console.log("DATA, SuccessFULLY DELETED");
      getData();
      toast.success("Company deleted successfully!");
    } catch (error) {
      toast.error("Error deleting Company!");

      console.error(
        "Error deleting data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // COMPANIES PUT API

  const getSingleData = async (value) => {
    try {
      const updatedData = {
        companyName: value.COMPANY_NAME, // Make sure these match
        companyDesc: value.COMAPNY_SHORT_DESC, // Make sure these match
        address: value.ADDRESS,
        uan: value.UAN,
        email: value.EMAIL,
        city: value.CITY,
        country: value.COUNTRY,
        createdBy: value.CREATED_BY,
        updatedBy: value.LAST_UPDATED_BY,
        url: value.URL,
        ntn: value.NTN,
        stn: value.STN,
        phoneNo: value.PHONE_NO,
        faxNo: value.FAX_NO,
      };
      console.log("VALUE CHECK", value);
      setUpdateComapnyId(value.COMPANY_ID);
      setCompanyFormData(updatedData); // This will trigger a re-render
      setShowCompanyButton(true); // This will show the update button in the form
      navigate("/company-form"); // After setting the data, navigate to the form
    } catch (error) {
      console.error("Error in getSingleData:", error);
    }
  };

  const UpdateData = async () => {
    try {
      console.log("Sending data: ", companyFormData); // Log the data
      await axios.put(
        `http://localhost:5000/api/companies/${updateCompanyId}`,
        {
          COMPANY_NAME: companyFormData.companyName,
          COMAPNY_SHORT_DESC: companyFormData.companyDesc,
          ADDRESS: companyFormData.address,
          UAN: companyFormData.uan,
          EMAIL: companyFormData.email,
          CITY: companyFormData.city,
          COUNTRY: companyFormData.country,
          CREATED_BY: "1",
          LAST_UPDATED_BY: "1",
          URL: companyFormData.url,
          NTN: companyFormData.ntn,
          STN: companyFormData.stn,
          PHONE_NO: companyFormData.phoneNo,
          FAX_NO: companyFormData.faxNo,
        }
      );
      console.log("DATA, SuccessFULLY Updated");
      setCompanyFormData({
        companyName: "",
        companyDesc: "",
        address: "",
        uan: "",
        email: "",
        city: "",
        country: "",
        // createdBy: "",
        // updatedBy: "",
        url: "",
        ntn: "",
        stn: "",
        phoneNo: "",
        faxNo: "",
      });
      toast.success("Company updated successfully!");
      navigate("/");
      getData();
    } catch (error) {
      toast.error("Error updating Company!");
      console.error(
        "Error posting data:",
        error.response ? error.response.data : error.message
      );
    }
  };
  
  // ######################################################################################################################################


// Register FORM

const [registerFormData, setRegisterFormData] = useState({
  username:"",
  email: "",
  password: "",
  role: "admin",
});

const registerHandleChange = (e) => {
  const { name, value } = e.target;
  setRegisterFormData({
    ...registerFormData,
    [name]: value,
  });
};

const registerHandleSubmit = (e) => {
  e.preventDefault();
  registerUser()
  console.log("Form Data Submitted:", registerFormData);
};


// POST REGISTER

const registerUser = async () => {
  try {
    await axios.post("http://localhost:5000/api/register", registerFormData);
    toast.success("Registration successful!");
    setRegisterFormData({
      email: "",
      password: "",
      role: "admin",
    });
    navigate("/login");
  } catch (error) {
    toast.error("Error registering!");
    console.error(
      "Error registering data:",
      error.response? error.response.data : error.message
    );
  }
};


//Login Form

const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

const [loginFormData, setLoginFormData] = useState({
  email: "",
  password: "",
});

const loginHandleChange = (e) => {
  const { name, value } = e.target;
  setLoginFormData({
    ...loginFormData,
    [name]: value,
  });
};

const loginHandleSubmit = (e) => {
  e.preventDefault();
  loginUser()
  console.log("Login Data Submitted:", loginFormData);
};


// POST LoGIn

const loginUser = async () => {
  try {
   const response =  await axios.post("http://localhost:5000/api/login", loginFormData);
    const { user,} = response.data;
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user); 
    toast.success("Login successful!");
    setRegisterFormData({
      email: "",
      password: "",
    });
    navigate("/");
  } catch (error) {
    toast.error("Error registering!");
    console.error(
      "Error registering data:",
      error.response? error.response.data : error.message
    );
  }
};







  // ######################################################################################################################################
  // SIDEBAR HANDLING
  const [openAvatar, setOpenAvatar] = useState(false);
  const [onMobile, setOnMobile] = useState(true);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  const OverViewTable = [
    { title: "Home", icon: MdOutlineSpeed, url: "/" },
    { title: "App", icon: MdOutlineSpeed, url: "/sss" },
    { title: "Ecommerce", icon: MdOutlineSpeed, url: "/Ecommerce" },
    { title: "Analytics", icon: MdOutlineSpeed, url: "/Analytics" },
    { title: "Banking", icon: MdOutlineSpeed, url: "/Banking" },
    { title: "Booking", icon: MdOutlineSpeed, url: "/Booking" },
  ];

  // const menuItems = [
  //   { label: "Profile", url: "/profile" },
  //   { label: "Cards", url: "/cards" },
  //   { label: "List", url: "/list" },
  //   { label: "Create", url: "/create" },
  //   { label: "Edit", url: "/edit" },
  //   { label: "Account", url: "/account" },
  // ];

  const menuItems = [
    {
      label: "Level 1a",
      url: "#",
      subItems: [
        {
          label: "Level 2a",
          url: "#",
        },
        {
          label: "Level 2b",
          url: "#",
          subItems: [
            {
              label: "Level 3a",
              url: "#",
            },
            {
              label: "Level 3b",
              url: "#",
            },
          ],
        },
      ],
    },
    {
      label: "Level 1b",
      url: "#",
    },
  ];

  // ######################################################################################################################################

  useEffect(() => {
    getData();
  }, []);

  // ######################################################################################################################################

  const contextValue = {
    companiesData,
    setCompaniesData,
    companyFormData,
    setCompanyFormData,
    postData,
    deleteData,
    getSingleData,
    showCompanyButton,
    UpdateData,

    // SIDEBAR HANDLING

    onMobile,
    setOnMobile,
    location,
    OverViewTable,
    menuItems,
    isOpen,
    setIsOpen,
    isOpen1,
    setIsOpen1,
    isOpen2,
    setIsOpen2,
    isOpen3,
    setIsOpen3,
    mobileMenuOpen,
    setMobileMenuOpen,
    openAvatar,
    setOpenAvatar,

    // REGISTER FORM
    registerHandleChange,
    registerHandleSubmit,
    registerFormData,

    // LOGIN FORM
    loginHandleChange,
    loginHandleSubmit,
    loginFormData,
    user, setUser


  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
