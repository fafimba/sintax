import { test, expect, type Page } from "@playwright/test";
import { lessons } from "../src/learning/curriculum";
const open = async (page: Page, id: string, step = 1) => {
  await page.goto(`/#/aprender/${id}/${step}`);
  await expect(page.locator("h1")).toBeVisible();
};
const choose = async (page: Page, label: string, option: string) =>
  page
    .getByRole("group", { name: label, exact: true })
    .getByRole("button", { name: option, exact: true })
    .click();
const sentence = (page: Page) => page.locator(".syntax-sentence");

test("the first example is immediately usable, reversible and keyboard accessible", async ({
  page,
}) => {
  await open(page, "palabras");
  const chip = page.getByRole("button", { name: /Cambiar protagonista/ });
  const next = page.getByRole("link", { name: "Siguiente idea", exact: true });
  await expect(next).toHaveCount(0);
  await chip.focus();
  await page.keyboard.press("Enter");
  await expect(next).toBeVisible();
  await expect(chip).toBeFocused();
  await expect(sentence(page)).toHaveAttribute(
    "aria-label",
    "El perro duerme.",
  );
  await chip.click();
  await expect(sentence(page)).toHaveAttribute(
    "aria-label",
    "El pájaro duerme.",
  );
  await page.getByRole("button", { name: "Reiniciar este ejemplo" }).click();
  await expect(sentence(page)).toHaveAttribute("aria-label", "El gato duerme.");
  await expect(chip).toBeFocused();
  await expect(next).toHaveCount(0);
  await page.getByText("Ver explicación", { exact: true }).click();
  await expect(page.locator(".concept-note h2")).toHaveText("Sustantivo");
  await expect(next).toHaveCount(0);
});

test("advancing needs one actual change and remembers explored steps", async ({
  page,
}) => {
  const next = page.getByRole("link", { name: "Siguiente idea", exact: true });
  await open(page, "palabras", 2);
  await expect(next).toHaveCount(0);
  await choose(page, "Cuántos gatos", "Uno");
  await expect(next).toHaveCount(0);
  await choose(page, "Cuántos gatos", "Varios");
  await expect(next).toBeVisible();
  await choose(page, "Cuántos gatos", "Uno");
  await expect(next).toBeVisible();
  await page.reload();
  await expect(next).toBeVisible();
  await next.click();
  await expect(
    page.getByRole("button", { name: "Cerrar lección" }),
  ).toHaveCount(0);
  await page.getByRole("link", { name: "Anterior", exact: true }).click();
  await expect(next).toBeVisible();
  await open(page, "grupos");
  await expect(next).toHaveCount(0);
  await page.getByRole("slider").focus();
  await page.keyboard.press("ArrowRight");
  await expect(next).toBeVisible();
});

test("navigation and reload retain the precise exploration without forcing an answer", async ({
  page,
}) => {
  await open(page, "palabras", 2);
  await choose(page, "Cuántos gatos", "Varios");
  await page.getByRole("link", { name: "Siguiente idea", exact: true }).click();
  await page.getByRole("link", { name: "Anterior", exact: true }).click();
  await expect(sentence(page)).toHaveAttribute(
    "aria-label",
    "Los gatos curiosos",
  );
  await page.reload();
  await expect(sentence(page)).toHaveAttribute(
    "aria-label",
    "Los gatos curiosos",
  );
  await page.getByRole("link", { name: "Siguiente idea", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Cerrar lección" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: /Cambiar matiz/ }).click();
  await page.getByRole("button", { name: "Cerrar lección" }).click();
  await expect(
    page.getByRole("heading", { name: "Las piezas van encajando." }),
  ).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          JSON.parse(localStorage.getItem("sintax_explorations_v3")!).completed,
      ),
    )
    .toEqual(["palabras"]);
  await page
    .getByRole("link", { name: "Seguir explorando", exact: true })
    .click();
  await expect(page).toHaveURL(/grupos\/1/);
});

test("direct and indirect substitutions can be combined and undone", async ({
  page,
}) => {
  await open(page, "indirecto");
  await choose(page, "A Marta · CI", "Pronombre");
  await expect(sentence(page)).toHaveAttribute(
    "aria-label",
    "Ana le dio la carta.",
  );
  await choose(page, "La carta · CD", "Pronombre");
  await expect(sentence(page)).toHaveAttribute("aria-label", "Ana se la dio.");
  await expect(page.locator('[data-piece="indirect"] .piece-label')).toHaveText(
    "CI",
  );
  await choose(page, "A Marta · CI", "Completo");
  await expect(sentence(page)).toHaveAttribute(
    "aria-label",
    "Ana la dio a Marta.",
  );
});

test("passive and nested clauses expose the actual changing structure", async ({
  page,
}) => {
  await open(page, "voz");
  await choose(page, "Voz", "Pasiva");
  await expect(page.locator('[data-piece="door"]')).toHaveClass(/tone-subject/);
  await expect(sentence(page)).toHaveAttribute(
    "aria-label",
    "La puerta fue pintada por Eva.",
  );
  await open(page, "subordinacion");
  await choose(page, "Lo que sabe Ana", "que Eva llegó");
  await expect(
    page.locator('[data-piece="object"] [data-piece="eva"]'),
  ).toBeVisible();
  await choose(page, "Lo que sabe Ana", "lo");
  await expect(sentence(page)).toHaveAttribute("aria-label", "Ana lo sabe.");
});

test("all lessons are open and concepts can be searched with or without accents", async ({
  page,
}) => {
  await page.goto("/#/recorrido");
  await expect(page.locator(".map-lesson")).toHaveCount(lessons.length);
  await page.locator(".map-lesson").last().click();
  await expect(page).toHaveURL(/subordinacion/);
  await page.goto("/#/conceptos");
  await page.getByRole("textbox", { name: "Buscar conceptos" }).fill("regimen");
  await expect(
    page.getByText("Complemento de régimen", { exact: true }),
  ).toBeVisible();
  await page.getByRole("textbox", { name: "Buscar conceptos" }).fill("qzxqzx");
  await expect(
    page.getByRole("heading", { name: "No encontramos esa idea." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Ver todo", exact: true }).click();
  await expect(page.locator(".glossary-item")).toHaveCount(
    lessons.reduce((n, l) => n + l.scenes.length, 0),
  );
  await page.goto("/#/explorar");
  await page
    .getByRole("button", { name: "Conectar ideas", exact: true })
    .click();
  await expect(page.locator(".explore-card")).toHaveCount(8);
  await page.locator(".explore-card").last().click();
  await expect(page).toHaveURL(/subordinacion\/3/);
});

test("mobile menu traps focus, closes on Escape and restores page access", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await open(page, "palabras");
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Sintax, continuar aprendiendo" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(page.locator(".lesson-link").last()).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Sintax, continuar aprendiendo" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Abrir menú" })).toBeFocused();
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await page.getByRole("link", { name: "Tu recorrido", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator("main h1")).toHaveText(
    "Tu camino por la sintaxis.",
  );
});

test("corrupt storage, unavailable storage and invalid URLs do not break learning", async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      "sintax_explorations_v3",
      JSON.stringify({
        lesson: "obsolete",
        completed: {},
        step: -600,
        scenes: [],
      }),
    );
  });
  await page.goto("/#/aprender/missing/-30");
  await expect(
    page.getByRole("button", { name: /Cambiar protagonista/ }),
  ).toBeVisible();
  await page.goto("/#/aprender/indirecto/999");
  await expect(page.locator("main h1")).toBeVisible();
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException("blocked");
    };
  });
  await open(page, "palabras");
  await page.getByRole("button", { name: /Cambiar protagonista/ }).click();
  await expect(sentence(page)).toHaveAttribute(
    "aria-label",
    "El perro duerme.",
  );
});

test("every scene and its largest control states fit narrow screens without runtime errors", async ({
  page,
}, info) => {
  test.setTimeout(180_000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  const widths = info.project.name === "desktop" ? [320, 768, 1440] : [390];
  for (const width of widths) {
    await page.setViewportSize({ width, height: 950 });
    for (const lesson of lessons)
      for (const [index, scene] of lesson.scenes.entries()) {
        await open(page, lesson.id, index + 1);
        for (const control of scene.controls.filter((c) => c.kind !== "word")) {
          if (control.kind === "range")
            await page
              .getByRole("slider")
              .fill(String(control.options.length - 1));
          else
            await choose(
              page,
              control.label,
              control.options[control.options.length - 1],
            );
        }
        const bounds = await page.evaluate(() => ({
          content: document.documentElement.scrollWidth,
          viewport: innerWidth,
        }));
        expect(
          bounds.content,
          `${lesson.id}/${scene.id} at ${width}px`,
        ).toBeLessThanOrEqual(bounds.viewport + 1);
        if (scene.controls.some((c) => c.kind !== "word"))
          await expect(page.locator(".discovery p")).not.toBeEmpty();
        await expect(page.locator(".syntax-sentence")).not.toContainText(
          "undefined",
        );
      }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await open(page, "subordinacion", 2);
  await choose(page, "Descripción del gato", "que vive aquí");
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(391);
  expect(errors).toEqual([]);
});

test("the lesson starts quietly and reveals explanations without interrupting exploration", async ({
  page,
}) => {
  await open(page, "palabras");
  await expect(page.locator(".discovery")).toBeEmpty();
  await expect(page.locator(".concept-body")).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Reiniciar este ejemplo" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: /Cambiar protagonista/ }).click();
  await expect(page.locator(".discovery p")).toHaveText(
    "Cambia el animal. La frase sigue funcionando igual.",
  );
  const height = await page
    .locator(".experiment")
    .evaluate((el) => el.getBoundingClientRect().height);
  await page.getByText("Ver explicación", { exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Sustantivo", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Cambiar protagonista/ }).click();
  await expect(sentence(page)).toHaveAttribute(
    "aria-label",
    "El pájaro duerme.",
  );
  await page.getByRole("button", { name: "Reiniciar este ejemplo" }).click();
  await expect(page.locator(".discovery")).toBeEmpty();
  expect(
    await page
      .locator(".experiment")
      .evaluate((el) => el.getBoundingClientRect().height),
  ).toBe(height);
});

test("motion preserves keyboard focus and settles correctly after quick changes", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await open(page, "palabras");
  const word = page.getByRole("button", { name: /Cambiar protagonista/ });
  await word.focus();
  for (let i = 0; i < 8; i++) await page.keyboard.press("Enter");
  await expect(word).toBeFocused();
  await expect(sentence(page)).toHaveAttribute(
    "aria-label",
    "El pájaro duerme.",
  );
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await expect(
    page.getByRole("link", { name: "Sintax, continuar aprendiendo" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Abrir menú" })).toBeFocused();
  await open(page, "sujeto");
  await choose(page, "Orden", "Sujeto detrás");
  await choose(page, "Trenes", "Varios");
  await expect(sentence(page)).toHaveAttribute(
    "aria-label",
    "Llegan los trenes.",
  );
  await expect(page.locator('[data-piece="subject"]')).toHaveCount(1);
  await expect
    .poll(async () => {
      const subject = await page
        .locator('[data-piece="subject"]')
        .boundingBox();
      const verb = await page.locator('[data-piece="verb"]').boundingBox();
      return (
        !!subject && !!verb && (subject.y > verb.y + 10 || subject.x > verb.x)
      );
    })
    .toBe(true);
});
