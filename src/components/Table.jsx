
import React, { useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Context } from "@/context/Context";
import { Link } from "react-router-dom";

export function SimpleTableWithDropdown() {
  const {companiesData,deleteData,getSingleData} = useContext(Context)
  const [search, setSearch] = useState("");

  const filteredData = companiesData.filter(
    (item) =>
      item.COMPANY_NAME.toLowerCase().includes(search.toLowerCase()) ||
      item.ADDRESS.toLowerCase().includes(search.toLowerCase())
  );

  return (
<div className="w-full justify-center min-h-[91vh] h-auto flex flex-col items-center">
    <div className="w-[70%] px-6 border rounded-md shadow-xl  pb-10">
<h1 className="font-serif text-xl font-semibold tracking-wide py-5">Companies Detail</h1>
      <div className="flex items-center justify-between pb-4 ">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Link to={'/company-form'} className="bg-[#00a76f]  text-white p-2 rounded-md">Add Company</Link>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="h-[60px] bg-[#f4f6f8] " >
            <TableRow >
              <TableHead>Cmp_Name </TableHead>
              <TableHead>Phone_No</TableHead>
              <TableHead>FAX_No</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length ? (
              filteredData.map((cmp) => (
                <TableRow key={cmp.COMPANY_ID}>
                  <TableCell>{cmp.COMPANY_NAME}</TableCell>
                  <TableCell>${cmp.PHONE_NO}</TableCell>
                  <TableCell>${cmp.FAX_NO}</TableCell>
                  <TableCell>${cmp.EMAIL}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-6 p-0">
                          <span className="sr-only">Open menu</span>
                          ...
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="flex flex-col justify-start w-full">
                        <button className="w-full px-2 py-2" onClick={() => getSingleData(cmp)}>Edit</button>
                        <button className="w-full px-2 py-2" onClick={() => deleteData(cmp.COMPANY_ID)}>Delete</button>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <Button variant="outline" size="sm" disabled>
          Next
        </Button>
      </div> */}
    </div>
</div>
  );
}
