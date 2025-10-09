interface TestAttributes {
  /**
   * Element Id for test automation.
   * @desc generate "data-testid" attribute with given value,
   * its main purpose is to serve as a selector for query ops.
   */
  testId?: string;
}

export type { TestAttributes };
