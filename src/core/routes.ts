import { FC } from "react";
import SignInPage from "../modules/auth/pages/SignInPage";
import SignUpPage from "../modules/auth/pages/SignUpPage";
import ArticlePage from "../modules/feed/pages/ArticlePage";
import EditorPage from "../modules/feed/pages/EditorPage";
import GlobalFeedPage from "../modules/feed/pages/GlobalFeedPage";
import ProfilePage from "../modules/profile/pages/ProfilePage";
import SettingsPage from "../modules/profile/pages/SettingsPage";
interface RouteItem {
  path: string;
  Element: FC;
  private?: boolean;
}

export const routes: Record<string, RouteItem> = {
  globalFeed: {
    path: "/",
    Element: GlobalFeedPage,
  },
  personalFeed: {
    path: "/personal-feed",
    Element: GlobalFeedPage,
    private: true,
  },
  profile: {
    path: "/:profile",
    Element: ProfilePage,
  },
  profileFavorites: {
    path: "/:profile/favorites",
    Element: ProfilePage,
  },
  singleArticle: {
    path: "/article/:slug",
    Element: ArticlePage,
  },
  signUp: {
    path: "/sign-up",
    Element: SignUpPage,
  },
  signIn: {
    path: "/sign-in",
    Element: SignInPage,
  },
  settings: {
    path: "/settings",
    Element: SettingsPage,
    private: true,
  },
  createArticle: {
    path: "/editor",
    Element: EditorPage,
    private: true,
  },
  editArticle: {
    path: "/editor/:slug",
    Element: EditorPage,
    private: true,
  },
};
