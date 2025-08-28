'use client'
import GenericTable from "@/components/GenericTableProps/GenericTableProps";

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
];

const data = [
  { name: "Hamza", email: "hamza@test.com", role: "Admin" },
  { name: "Ali", email: "ali@test.com", role: "User" },
  { name: "Amr", email: "ali@test.com", role: "User" },
];

export default function Dashboard() {
  return (
    <GenericTable
      columns={columns}
      data={data}
      actions={(row) => [
        { type: "view",color:'red', onClick: () => alert("Viewing 111" + row.name) },
        { type: "edit",color:'black', onClick: () => alert("Editing 222  " + row.name) },
        { type: "delete",color:'blue', onClick: () => alert("Deleting 222 " + row.name) },
      ]}
    />
  );
};
