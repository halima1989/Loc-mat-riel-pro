// document.addEventListener('DOMContentLoaded', function() {
//     let isLogin = true;
  
//     function toggleView() {
//       const imgSection = document.querySelector('.login-img-section');
//       const formSection = document.querySelector('.flex.w-full.lg\:w-1/2.justify-center.items-center.bg-white.rounded-[8px]');
//       const imgSection2 = document.querySelector('.login-img-section.hidden.lg\:flex.w-full.lg\:w-1/2.justify-around.items-center');
//       const formSection2 = document.querySelector('.flex.w-full.lg\:w-1/2.justify-center.items-center.bg-white.rounded-[8px]');
  
//       const tl = gsap.timeline({
//         onComplete: () => isLogin = !isLogin
//       });
  
//       if (isLogin) {
//         tl.to(imgSection, { xPercent: 100, duration: 0.8, ease: "power2.out" })
//           .to(formSection, { xPercent: -100, duration: 0.8, ease: "power2.out", onComplete: () => {
//             gsap.set(imgSection2, { clearProps: "all" });
//             gsap.set(formSection2, { clearProps: "all" });
//           }}, "<");
//       } else {
//         tl.to(imgSection2, { xPercent: -100, duration: 0.8, ease: "power2.inOut" })
//           .to(formSection2, { xPercent: 100, duration: 0.8, ease: "power2.inOut", onComplete: () => {
//             gsap.set(imgSection, { clearProps: "all" });
//             gsap.set(formSection, { clearProps: "all" });
//           }}, "<");
//       }
//     }
  
//     const getStartedButton = document.querySelector('.get-started-button');
//     getStartedButton.addEventListener('click', toggleView);
//   });
  