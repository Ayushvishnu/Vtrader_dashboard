

// // import React, { useEffect, useState } from "react";
// // import "./Navbar.css";

// // function Navbar() {
// //   const [time, setTime] = useState("");
// //   const [segment, setSegment] = useState("Equity");

// //   useEffect(() => {
// //     const updateTime = () => {
// //       const now = new Date();

// //       setTime(
// //         now.toLocaleTimeString("en-IN", {
// //           hour: "2-digit",
// //           minute: "2-digit",
// //           second: "2-digit",
// //           hour12: false,
// //           timeZone: "Asia/Kolkata",
// //         })
// //       );
// //     };

// //     updateTime();

// //     const timer = setInterval(updateTime, 1000);

// //     return () => clearInterval(timer);
// //   }, []);

// //   return (
// //     <header className="vittalokhi-navbar">

// //       {/* ================= LEFT ================= */}

// //       <div className="navbar-left">

// //         {/* SEARCH */}

// //         {/* <div className="navbar-search">
// // <i class="fa-brands fa-sistrix"></i>

// //           <input
// //             type="text"
// //             placeholder="Search RELIANCE, NIFTY, TCS..."
// //           />
// //         </div> */}


// //         {/* EXCHANGE */}

// //         {/* <select className="navbar-exchange">
// //           <option>All Exchanges</option>
// //           <option>NSE</option>
// //           <option>BSE</option>
// //           <option>NFO</option>
// //           <option>BFO</option>
// //         </select> */}


// //         {/* SEGMENT */}

// //         {/* <div className="navbar-segment">
// //           <button
// //             type="button"
// //             className={
// //               segment === "Equity"
// //                 ? "active"
// //                 : ""
// //             }
// //             onClick={() =>
// //               setSegment("Equity")
// //             }
// //           >
// //             Equity
// //           </button>

// //           <button
// //             type="button"
// //             className={
// //               segment === "Options"
// //                 ? "active"
// //                 : ""
// //             }
// //             onClick={() =>
// //               setSegment("Options")
// //             }
// //           >
// //             Options
// //           </button>
// //         </div> */}

// //       </div>


// //       {/* ================= RIGHT ================= */}

// //       <div className="navbar-right">

// //         {/* MARKET STATUS */}

// //         <div className="market-status">
// //           <span className="market-dot"></span>

// //           <span>MARKET OPEN</span>

// //           <small>{time}</small>
// //         </div>


// //         {/* NOTIFICATION */}

// //         <button
// //           type="button"
// //           className="navbar-notification"
// //         >
// //           <i className="fa-regular fa-bell"></i>
// //         </button>


// //         {/* PROFILE */}

// //         <button
// //           type="button"
// //           className="navbar-profile"
// //         >
// //           <span className="profile-avatar">
// //             DD
// //           </span>

// //           <span className="profile-name">
// //             Dealer Desk
// //           </span>

// //           <i className="fa-solid fa-chevron-down"></i>
// //         </button>

// //       </div>

// //     </header>
// //   );
// // }

// // export default Navbar;









// import React, {
//   useEffect,
//   useState,
// } from "react";

// import "./Navbar.css";

// function Navbar() {
//   const [time, setTime] = useState("");
//   const [segment, setSegment] = useState("Equity");

//   useEffect(() => {
//     const updateTime = () => {
//       const now = new Date();

//       setTime(
//         now.toLocaleTimeString("en-IN", {
//           hour: "2-digit",
//           minute: "2-digit",
//           second: "2-digit",
//           hour12: false,
//           timeZone: "Asia/Kolkata",
//         })
//       );
//     };

//     updateTime();

//     const timer = setInterval(
//       updateTime,
//       1000
//     );

//     return () =>
//       clearInterval(timer);
//   }, []);

//   return (
//     <header className="vittalokhi-navbar">

//       {/* ================= LEFT ================= */}

//       <div className="navbar-left">

//         {/* LOGO */}

//         {/* <div className="navbar-brand-logo">

//           <img
//             src="/images/VittaLokiLogo.png"
//             alt="Vitta Loki"
//             className="navbar-logo-img"
//           />

//         </div> */}


//         {/* SEARCH */}

//         {/* <div className="navbar-search">

//           <i className="fa-solid fa-magnifying-glass"></i>

//           <input
//             type="text"
//             placeholder="Search RELIANCE, NIFTY, TCS..."
//           />

//         </div> */}


//         {/* EXCHANGE */}

//         {/* <select className="navbar-exchange">

//           <option>
//             All Exchanges
//           </option>

//           <option>
//             NSE
//           </option>

//           <option>
//             NFO
//           </option>

//           <option>
//             BFO
//           </option>

//         </select> */}


//         {/* SEGMENT */}

//         {/* <div className="navbar-segment">

//           <button
//             type="button"
//             className={
//               segment === "Equity"
//                 ? "active"
//                 : ""
//             }
//             onClick={() =>
//               setSegment("Equity")
//             }
//           >
//             Equity
//           </button>


//           <button
//             type="button"
//             className={
//               segment === "Options"
//                 ? "active"
//                 : ""
//             }
//             onClick={() =>
//               setSegment("Options")
//             }
//           >
//             Options
//           </button>

//         </div> */}

//       </div>


//       {/* ================= RIGHT ================= */}

//       <div className="navbar-right">

//         <div className="market-status">

//           <span className="market-dot"></span>

//           <span>
//             MARKET OPEN
//           </span>

//           <small>
//             {time}
//           </small>

//         </div>


//         <button
//           type="button"
//           className="navbar-notification"
//         >
//           <i className="fa-regular fa-bell"></i>
//         </button>


//         <button
//           type="button"
//           className="navbar-profile"
//         >
//           <span className="profile-avatar">
//             DD
//           </span>

//           <span className="profile-name">
//             Dealer Desk
//           </span>

//           <i className="fa-solid fa-chevron-down"></i>
//         </button>

//       </div>

//     </header>
//   );
// }

// export default Navbar;


















import React, {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import "./Navbar.css";


function Navbar() {
  const navigate = useNavigate();

  const [
    time,
    setTime,
  ] = useState("");

  const [
    showProfile,
    setShowProfile,
  ] = useState(false);


  /* =====================================================
     TIME
  ===================================================== */

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString(
          "en-IN",
          {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone:
              "Asia/Kolkata",
          }
        )
      );
    };


    updateTime();


    const timer =
      setInterval(
        updateTime,
        1000
      );


    return () =>
      clearInterval(timer);
  }, []);


  /* =====================================================
     LOGOUT
  ===================================================== */

  // const handleLogout =
  //   async () => {

  //     const result =
  //       await Swal.fire({
  //         icon: "warning",

  //         title:
  //           "Logout?",

  //         text:
  //           "Are you sure you want to logout?",

  //         showCancelButton:
  //           true,

  //         confirmButtonText:
  //           "Logout",

  //         cancelButtonText:
  //           "Cancel",

  //         confirmButtonColor:
  //           "#dc3545",

  //         cancelButtonColor:
  //           "#42545d",

  //         background:
  //           "#061923",

  //         color:
  //           "#ffffff",
  //       });


  //     if (
  //       !result.isConfirmed
  //     ) {
  //       return;
  //     }


  //     setShowProfile(
  //       false
  //     );


  //     navigate(
  //       "/login"
  //     );
  //   };
const handleLogout = () => {
  // 1. Close profile modal first
  setShowProfile(false);

  // 2. Open logout confirmation after modal closes
  setTimeout(() => {
    Swal.fire({
      icon: "warning",

      title: "Are you sure you want to logout?",

      text: "You will be redirected to the login page.",

      showCancelButton: true,

      confirmButtonText: "Yes, Logout",

      cancelButtonText: "Cancel",

      reverseButtons: true,

      background: "#061923",

      color: "#ffffff",

      confirmButtonColor: "#dc3545",

      cancelButtonColor: "#42545d",

      customClass: {
        popup: "vittalokhi-logout-alert",
        confirmButton: "vittalokhi-logout-confirm",
        cancelButton: "vittalokhi-logout-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear demo/auth data here later if needed
        // localStorage.removeItem("token");

        navigate("/");
      }
    });
  }, 150);
};

  return (
    <>

      <header className="vittalokhi-navbar">

        {/* ================= LEFT ================= */}

        <div className="navbar-left">

          {/* LOGO */}

          {/*

          <div className="navbar-brand-logo">

            <img
              src="/images/VittaLokiLogo.png"
              alt="Vitta Loki"
              className="navbar-logo-img"
            />

          </div>

          */}

        </div>


        {/* ================= RIGHT ================= */}

        <div className="navbar-right">

          {/* MARKET */}

          <div className="market-status">

            <span className="market-dot"></span>

            <span>
              MARKET OPEN
            </span>

            <small>
              {time}
            </small>

          </div>


          {/* NOTIFICATION */}

          <button
            type="button"
            className="navbar-notification"
            onClick={() =>
              navigate(
                "/notification"
              )
            }
          >

            <i className="fa-regular fa-bell"></i>

          </button>


          {/* PROFILE */}

          <button
            type="button"
            className={`navbar-profile ${
              showProfile
                ? "active"
                : ""
            }`}
            onClick={() =>
              setShowProfile(
                true
              )
            }
          >

            <span className="profile-avatar">
              F
            </span>


            <span className="profile-name">
              Faisal
            </span>


            <i className="fa-solid fa-chevron-down"></i>

          </button>

        </div>

      </header>


      {/* =====================================================
          PROFILE MODAL
      ===================================================== */}

      {showProfile && (

        <div
          className="navbar-profile-overlay"
          onClick={() =>
            setShowProfile(
              false
            )
          }
        >

          <div
            className="navbar-profile-modal"
            onClick={(
              event
            ) =>
              event.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="profile-modal-header">

              <div>

                <h3>
                  My Profile
                </h3>

                <p>
                  View your account details
                </p>

              </div>


              <button
                type="button"
                className="profile-modal-close"
                onClick={() =>
                  setShowProfile(
                    false
                  )
                }
              >

                <i className="fa-solid fa-xmark"></i>

              </button>

            </div>


            {/* BODY */}

            <div className="profile-modal-body">

              {/* PROFILE SUMMARY */}

              <div className="profile-summary-card">

                <div className="profile-summary-avatar">
                  F
                </div>


                <div>

                  <h4>
                    Faisal
                  </h4>

                  <span>
                    PLATFORM ADMIN
                  </span>

                </div>

              </div>


              {/* DETAILS */}

              <div className="profile-details-card">

                {/* USERNAME */}

                <div className="profile-detail-row">

                  <div className="profile-detail-icon">

                    <i className="fa-solid fa-user"></i>

                  </div>


                  <div>

                    <span>
                      Username
                    </span>

                    <strong>
                      Faisal
                    </strong>

                  </div>

                </div>


                {/* EMAIL */}

                <div className="profile-detail-row">

                  <div className="profile-detail-icon">

                    <i className="fa-regular fa-envelope"></i>

                  </div>


                  <div>

                    <span>
                      Email Address
                    </span>

                    <strong>
                      faisalpp@vittafin.com
                    </strong>

                  </div>

                </div>


                {/* ROLE */}

                <div className="profile-detail-row">

                  <div className="profile-detail-icon">

                    <i className="fa-solid fa-user-shield"></i>

                  </div>


                  <div>

                    <span>
                      Role
                    </span>

                    <strong>
                      PLATFORM ADMIN
                    </strong>

                  </div>

                </div>

              </div>


              {/* LOGOUT */}

              <button
                type="button"
                className="profile-logout-btn"
                onClick={
                  handleLogout
                }
              >

                <i className="fa-solid fa-arrow-right-from-bracket"></i>

                Logout

              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}


export default Navbar;