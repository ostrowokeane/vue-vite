import Icon from "./icon.vue";

import { names } from "./icon.constants";

export default {
  title: "base/Icon",
  component: Icon,
  argTypes: {
    name: {
      options: names,
      control: {
        type: "select",
      },
    },
  },
};

const Template = (args: any) => ({
  components: { Icon },
  setup() {
    return { args };
  },
  template: `
    <wbs-icon v-bind="args" />
  `,
});

export const Default: any = Template.bind({});
Default.args = {
  name: names[0],
  size: "3rem",
};

export const AllIcons = () => ({
  components: { Icon },
  setup() {
    return { names };
  },
  template: `
    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 3rem 1rem;">
      <div style="text-align: center" v-for="name in names" :key="name">
        <wbs-icon :name="name" size="70px" />
        <div>{{ name }}</div>
      </div>
    </div>
  `,
});
