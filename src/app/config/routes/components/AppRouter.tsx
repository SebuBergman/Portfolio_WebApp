import { Route, Routes } from "react-router-dom";

import NotFoundPage from "@pages/not-found";
import AuthLayout from "@features/ui/layout/AuthLayout";
//import SignUpPage from "@pages/register";
import LoginPage from "@pages/login";
import Portfolio from "@pages/portfolio";

import { AppRoutes } from "../AppRoutes";
import AccountLayout from "@features/ui/layout/accountLayout/AccountLayout";
import ProtectedRoute from "./ProtectedRoute";
import MovieList from "@pages/account/movieList";
import TVShowList from "@pages/account/tvShowList";
import DashboardPage from "@pages/account/dashboard";
import BookList from "@pages/account/bookList";
import VinylList from "@pages/account/vinylList";

export default function AppRouter() {
  return (
    <Routes>
      {/* BergmanWebWorks */}
      {/*<Route path={AppRoutes.home} element={<FrontPage />} />*/}
      {/* Portfolio */}
      <Route path={AppRoutes.home} element={<Portfolio />} />

      <Route element={<AuthLayout />}>
        {/*<Route path={AppRoutes.signUp} element={<SignUpPage />} />*/}
        <Route path={AppRoutes.login} element={<LoginPage />} />
      </Route>
      {/* User account Pages */}
      <Route
        element={
          <ProtectedRoute>
            <AccountLayout />
          </ProtectedRoute>
        }
      >
        <Route path={AppRoutes.movielibrary} element={<DashboardPage />} />
        <Route path={AppRoutes.movieList} element={<MovieList />} />
        <Route path={AppRoutes.tvShowList} element={<TVShowList />} />
        <Route path={AppRoutes.bookList} element={<BookList />} />
        <Route path={AppRoutes.vinylList} element={<VinylList />} />
      </Route>
      {/* Not Found Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
