
function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 text-center py-4 mt-6 fixed bottom-0 w-full">
      <p className="text-sm">
        © {new Date().getFullYear()} CRM Application | Built with MERN Stack
      </p>
    </footer>
  );
}

export default Footer;

