import { Link } from "react-router-dom";

export default function Hero({data}) {
  return (
    <section className="bg-blue-100 py-20 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Global Trade. Local Roots.</h1>
        <p className="text-lg text-blue-700 mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis culpa recusandae, iure fugit ducimus est?</p>
        <Link to={{pathname:"/createAcc",state: [data]}} className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800">
          Create Account!
        </Link>
      </div>
    </section>
  );
}
