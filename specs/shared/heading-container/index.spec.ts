import { test, expect } from "@sand4rt/experimental-ct-web"
import { BdoHeadingContainer } from "../../../src/shared/heading-container"

test.describe("bdo-heading-container", () => {

    [1, 2, 3, 4, 5, 6].forEach(level => {
        test(`renders heading level ${level}`, async ({ mount }) => {
            const component = await mount(BdoHeadingContainer, {
                slots: {
                    header: `<h${level} data-testid='header'>Heading</h~${level}>`,
                    default: "<div data-testid='content'>Content</div>"
                }
            })

            await expect(component).toBeVisible()
            await expect(component.getByTestId("header")).toBeVisible();
            await expect(component.getByTestId("content")).toBeVisible();
            const actualLevel = await component.getAttribute("level");
            expect(actualLevel).toBe(level.toString());
        });
    });

    test("content of nested heading containers is not visible when aria is not expanded", async ({ mount }) => {
        const component = await mount(BdoHeadingContainer, {
            slots: {
                header: "<h1 data-testid='header'>Heading</h1>",
                default: "<div data-testid='content'>Content</div>"
            },
            props: {
                ariaExpanded: "false"
            }
        })

        await expect(component).toBeVisible()
        await expect(component.getByTestId("content")).not.toBeVisible();
    });

    test("content of nested heading containers is visible when aria is expanded", async ({ mount }) => {
        const component = await mount(BdoHeadingContainer, {
            slots: {
                header: "<h1 data-testid='header'>Heading</h1>",
                default: "<div data-testid='content'>Content</div>"
            },
            props: {
                ariaExpanded: "true"
            }
        })

        await expect(component).toBeVisible()
        await expect(component.getByTestId("header")).toBeVisible();
        await expect(component.getByTestId("content")).toBeVisible();
    });

    test("content of nested heading containers is visible header is clicked", async ({ mount }) => {
        const component = await mount(BdoHeadingContainer, {
            slots: {
                header: "<h1 data-testid='header'>Heading</h1>",
                default: "<div data-testid='content'>Content</div>"
            },
            props: {
                ariaExpanded: "false"
            }
        })

        await expect(component).toBeVisible()
        await expect(component.getByTestId("content")).not.toBeVisible();

        await component.getByTestId("header").click()

        await expect(component.getByTestId("content")).toBeVisible();

        await component.getByTestId("header").click()

        await expect(component.getByTestId("content")).not.toBeVisible();
    });
})