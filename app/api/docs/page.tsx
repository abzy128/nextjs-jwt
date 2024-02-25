import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "@/components/ui/react-swagger";
export default function Home() {
    return (
        <main>
            <ReactSwagger spec={getApiDocs()} />
        </main>
    );
}
