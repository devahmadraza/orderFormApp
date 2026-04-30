import OrderForm from "@/components/OrderForm";
import top from "@/assets/top.jpeg";
import details from "@/assets/details.jpg";
import packages from "@/assets/packages.png";
export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-100 px-4 py-12 font-sans">
      <main className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6">
     <img src={top.src} alt="Top Image" className="w-full rounded-lg object-cover" />         
        <OrderForm />
     <img src={details.src} alt="Details Image" className="w-full rounded-lg object-cover" />         
        <h1 className="text-3xl font-bold text-zinc-900">Order Form</h1>
        <img src={packages.src} alt="Packages Image" className="w-full rounded-lg object-cover" />
      </main> 
    </div>
  );
}
