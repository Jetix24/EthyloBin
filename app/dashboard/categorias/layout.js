import CategoriaList from "./components/CategoriaList";

export default async function CategoriaLayout({ children }) {

  return (
    <div className="h-full">
      <CategoriaList />
      {children}
    </div>
  );
}
