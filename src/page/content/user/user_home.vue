<template>
  <div class="info">
    <div></div>
    <div>
      <List item-layout="vertical">
        <a href="/user_donate" target="_blank">
          <div>
            <ListItem v-for="item in data" :key="item.title" style="color:black">
              <ListItemMeta
                :avatar="item.avatar"
                :title="item.title"
                :description="item.description"
              />
              {{ item.content }}
              <template slot="action">
                <li>
                  <Icon type="ios-star-outline" />123
                </li>
                <li>
                  <Icon type="ios-thumbs-up-outline" />234
                </li>
                <li>
                  <Icon type="ios-chatbubbles-outline" />345
                </li>
              </template>
              <template slot="extra">
                <img
                  src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large"
                  style="width: 280px"
                />
              </template>
            </ListItem>
          </div>
        </a>
      </List>
      <Page :total="10" page-size="5" show-total />
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    donate() {
      this.$router.push("/user_donate");
    },
    getAllProject() {
      
    },
  },
  data() {
    return {
      data: [
        {
          title: "This is title 1",
          description:
            "This is description, this is description, this is description.",
          avatar:
            "https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
          content:
            "This is the content, this is the content, this is the content, this is the content."
        },
        {
          title: "This is title 2",
          description:
            "This is description, this is description, this is description.",
          avatar:
            "https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
          content:
            "This is the content, this is the content, this is the content, this is the content."
        },
        {
          title: "This is title 3",
          description:
            "This is description, this is description, this is description.",
          avatar:
            "https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
          content:
            "This is the content, this is the content, this is the content, this is the content."
        },
        {
          title: "This is title 3",
          description:
            "This is description, this is description, this is description.",
          avatar:
            "https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
          content:
            "This is the content, this is the content, this is the content, this is the content."
        },
        {
          title: "This is title 3",
          description:
            "This is description, this is description, this is description.",
          avatar:
            "https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
          content:
            "This is the content, this is the content, this is the content, this is the content."
        }
      ]
    };
  }
};
</script>
