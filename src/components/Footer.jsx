import React from "react";

function Footer() {
  return (
    <>
      <footer className="bg-gray-100 text-gray-700 mt-10">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-2">Wallet Application</h3>
          <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, asperiores.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="/products" className="hover:underline">Recharges</a></li>
            <li><a href="/about" className="hover:underline">Transaction</a></li>
            <li><a href="/contact" className="hover:underline">Home</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact Us</h4>
          <p className="text-sm">Email: info@wallet.com</p>
          <p className="text-sm">Phone: +91-574567356345</p>
        </div>
      </div>
      <div className="text-center text-xs py-4 bg-gray-200">
        © {new Date().getFullYear()} Lorem ipsum dolor sit amet.
      </div>
    </footer>
    </>
  );
}
export default Footer