import { HeroText } from "../components/hero";
import Layout from "../components/layout/layout";

export default function IndexPage() {
  return (
    <Layout disableBreadcrumbs>
      <HeroText />
    </Layout>
  );
}
