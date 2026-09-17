import { requireSuperAdmin } from "../../lib/auth";

import NavbarClient from "./NavbarClient";

export default async function NavbarServer() {
  const user = await requireSuperAdmin();

  return <NavbarClient isSuperAdmin={user !== null} />;
}
1;
