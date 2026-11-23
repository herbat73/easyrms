/**
 * The "Dane testowe" panel on the lookup page is controlled only by `EASYRMS_PRELOAD_TEST_DATA` (issue #179), in every
 * environment. It needs the fake order source, because the sample orders exist only there.
 */
export function showTestData(input: { flag: string | undefined; orderSource: string | undefined }): boolean {
  return input.flag === "true" && input.orderSource === "fake";
}
