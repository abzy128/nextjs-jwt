import Container from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-4 flex flex-col items-center">
          <h3>Abzal Orazbek</h3>
          <h3>IT-2204</h3>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;