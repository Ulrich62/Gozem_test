import TestimonialDetails from "pages/TestimonialDetails";
import Testimonials from "pages/Testimonials";
import { Route, Routes } from "react-router-dom";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Testimonials />} />
      <Route path="/testimonials/:i" element={<TestimonialDetails />} />
    </Routes>
  );
};

export default MainRouter;
