export default function hasPermission(user, permissionsNeeded) {
  const matchedPermissions = user.permissions.includes(permissionsNeeded)

  if (matchedPermissions) return true
}
