"use client";

import { Anchor, Breadcrumbs } from "@mantine/core";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

function titleize(str: string) {
  let upper = true;
  let newStr = "";
  for (let i = 0, l = str.length; i < l; i++) {
    if (str[i] === " " || str[i] === "-") {
      upper = true;
      newStr += " ";
      continue;
    }
    newStr += upper ? str[i].toUpperCase() : str[i].toLowerCase();
    upper = false;
  }
  return newStr;
}

export default function NextBreadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    const asPathWithoutQuery = pathname.split("?")[0];
    const asPathNestedRoutes = asPathWithoutQuery
      .split("/")
      .filter((v) => v.length > 0);

    const crumblist = asPathNestedRoutes.map((subpath, idx) => {
      const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
      const text = titleize(subpath);
      return { href, text };
    });

    return [{ href: "/", text: "Home" }, ...crumblist];
  }, [pathname]);

  const items = breadcrumbs.map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.text}
    </Anchor>
  ));

  return (
    <Breadcrumbs aria-label="breadcrumb" separator="〉">
      {items}
    </Breadcrumbs>
  );
}
