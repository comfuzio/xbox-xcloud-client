import {
  Avatar,
  Card,
  CardBody,
  CircularProgress,
  Button,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { card } from "@/components/primitives";
import { useTRPC } from "@/utils/trpc";
import { getWebToken } from "@/utils/tokenhelper";
import { extractUserData } from "@/components/navbar";
import { removeLocalStorage, clearSessionStorage } from "@/utils/localstorage";
import { useModal } from "@/providers/modal";

export default function SettingsPage() {
  const showModal = useModal();
  const trpc = useTRPC();
  const profileData = useQuery(
    trpc.profile_get_current.queryOptions({ token: getWebToken() }),
  );

  function logout() {
    removeLocalStorage("auth_data_xal");
    removeLocalStorage("auth_data_msal");
    removeLocalStorage("auth_method");

    clearSessionStorage();

    // Reload page
    window.location.reload();
  }

  return (
    <section className="flex flex-col gap-4">
      <Card className={card()}>
        <CardBody>
          {profileData.isLoading ? (
            <CircularProgress aria-label="Loading profile..." size="lg" />
          ) : (
            <div className="flex flex-row gap-2">
              <Avatar
                isBordered
                className="mr-4"
                size="lg"
                src={
                  extractUserData(
                    profileData.data?.data.profileUsers[0].settings,
                  )?.GameDisplayPicRaw
                }
              />

              <div className="flex flex-col gap-2">
                <h1 className="text-xl">
                  {
                    extractUserData(
                      profileData.data?.data.profileUsers[0].settings,
                    )?.Gamertag
                  }
                </h1>

                <p className="text-sm text-default-500">
                  Gamerscore:{" "}
                  {
                    extractUserData(
                      profileData.data?.data.profileUsers[0].settings,
                    )?.Gamerscore
                  }
                </p>

                <div>
                  <Button
                    data-nav
                    color="primary"
                    data-nav-group="default"
                    onPress={() => {
                      showModal({
                        title: "Logout",
                        body: "Are you sure you want to logout?",
                        confirmText: "Logout",
                        cancelText: "Go back",
                        onConfirm: logout,
                      });
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      <Card className={card()}>
        <CardBody className="justify-center items-center">
          <h1 className="text-xl">Greenlight</h1>
          <p className="text-sm text-default-500">Version 2.3.2</p>

          <p className="text-sm text-default-500 pt-6">
            Website:
            <Button className="ml-2" size="sm">
              <Link
                data-nav
                data-nav-group="default"
                target="_blank"
                to="https://github.com/unknownskl/greenlight"
              >
                github.com/unknownskl/greenlight
              </Link>
            </Button>
          </p>
        </CardBody>
      </Card>
    </section>
  );
}
