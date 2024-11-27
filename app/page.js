import Image from "next/image";
import BooksTable from "./components/BooksTable";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <div className="">
      <BooksTable />
    </div>
  );
}
