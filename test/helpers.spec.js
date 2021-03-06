const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-string"));
const helpers = require("../helpers");

describe("generateTest", () => {
  it("generates a test", () => {});
});

describe("getApiMethods", () => {
  it("should get and format the api methods after the dataOptions flag", () => {
    const args = "test/test.vue --options props created watch";

    const getOptions = helpers.getOptionsByName("data,created,watch");

    expect(getOptions).to.equal(
      `data () {
                return {
              }
            },

            created () {
            },
            
            watch: {
            }`
    );
  });
});

describe("removeExtension()", () => {
  it("removes the extension from a file with an extension", () => {
    const withExt = "test.vue";

    const without = helpers.removeExtension(withExt);

    expect(without).to.equal("test");
  });

  it("removes the extension from a file without an extension", () => {
    const withExt = "test";

    const without = helpers.removeExtension(withExt);

    expect(without).to.equal("test");
  });
});

describe("getFilename()", () => {
  it("should extract name including extension from a path including a directory", () => {
    const args = "test/test.vue";

    const path = helpers.getFilename(args);

    expect(path).to.equal("test.vue");
  });

  it("should extract name including extension from a path including multi level directory", () => {
    const args = "test/nested/test.vue";

    const path = helpers.getFilename(args);

    expect(path).to.equal("test.vue");
  });

  it("should extract from a path which is a filename only", () => {
    const args = "test.vue";

    const path = helpers.getFilename(args);

    expect(path).to.equal("test.vue");
  });
});

describe("template()", () => {
  it("generates the correct template with name", () => {
    const expectedTemplate = `
            <template>
              <div></div>
            </template>
            
            <script>
              export default {
                name: 'Test'
              }
            </script>
            
            <style scoped>
            </style>
           `;

    const name = helpers.removeExtension("Test.vue");
    const result = helpers.template(name);

    expect(result).to.equal(expectedTemplate);
  });

  it("generates the correct template with name and options", () => {
    const expectedTemplate = `
            <template>
              <div></div>
            </template>
            
            <script>
              export default {
                name: 'Test',
                props: {},
                 
                data () {
                  return {
                  }
                }
              }
            </script>
            
            <style scoped>
            </style>
            `;

    const name = helpers.removeExtension("Test.vue");
    const options = helpers.getOptionsByName("props,data");
    const result = helpers.template(name, options);
    expect(result).to.equalIgnoreSpaces(expectedTemplate);
  });

  it("generates the correct template for incorrect lifecycle args", () => {
    const expectedTemplate = `
            <template>
              <div></div>
            </template>

            <script>
              export default {
                name: 'Test'
              }
            </script>
            
            <style scoped>
            </style>
            `;

    const name = helpers.removeExtension("Test.vue");
    const options = helpers.getOptionsByName("incorrect,bad");
    const result = helpers.template(name, options);
    expect(result).to.equalIgnoreSpaces(expectedTemplate);
  });
});

describe("testTemplate()", () => {
  it("generates the correct test template with name", () => {
    const expectedTemplate = `
            import { shallow } from '@vue/test-utils'
            import Foo from './Foo'

            describe(Foo, () => {
              it('renders', () => {
                const wrapper = shallow(Foo)
              })
            })
        `;

    const name = helpers.removeExtension("Foo.vue");
    const result = helpers.testTemplate(name);

    expect(result).to.equal(expectedTemplate);
  });
});
