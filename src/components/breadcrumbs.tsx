import { Anchor, Breadcrumbs, MediaQuery } from "@mantine/core";
import { useRouter } from "next/router";
import { useMemo } from "react";

function titleize(str: string) {
  let upper = true;
  let newStr = "";
  for (let i = 0, l = str.length; i < l; i++) {
    // Note that you can also check for all kinds of spaces  with
    // str[i].match(/\s/)
    if (str[i] === " ") {
      upper = true;
      newStr += str[i];
      continue;
    }
    newStr += upper ? str[i].toUpperCase() : str[i].toLowerCase();
    upper = false;
  }
  return newStr;
}

export default function NextBreadcrumbs() {
  // Gives us ability to load the current route details
  const router = useRouter();

  // Call the function to generate the breadcrumbs list
  const breadcrumbs = useMemo(() => {
    // Remove any query parameters, as those aren't included in breadcrumbs
    const asPathWithoutQuery = router.asPath.split("?")[0];

    // Break down the path between "/"s, removing empty entities
    // Ex:"/my/nested/path" --> ["my", "nested", "path"]
    const asPathNestedRoutes = asPathWithoutQuery
      .split("/")
      .filter((v) => v.length > 0);

    // Iterate over the list of nested route parts and build
    // a "crumb" object for each one.
    const crumblist = asPathNestedRoutes.map((subpath, idx) => {
      // We can get the partial nested route for the crumb
      // by joining together the path parts up to this point.
      const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
      // The title will just be the route string for now
      const text = titleize(subpath);
      return { href, text };
    });

    // Add in a default "Home" crumb for the top-level
    return [{ href: "/", text: "Home" }, ...crumblist];
  }, [router.asPath]);

  const items = breadcrumbs.map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.text}
    </Anchor>
  ));

  return (
    <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      <Breadcrumbs aria-label="breadcrumb" separator="〉">
        {items}
      </Breadcrumbs>
    </MediaQuery>
  );
}
