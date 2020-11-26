<template>
  <a-list
    id="comment-list"
    :header="`${data.length} replies`"
    item-layout="horizontal"
    :data-source="data"
    style="margin-left: 20px"
  >
    <a-list-item slot="renderItem" slot-scope="item">
      <a-comment :author="item.author" :avatar="item.avatar" id="comment">
        <template slot="actions">
        </template>
        <p slot="content" style="color: aliceblue;">
          {{ item.content }}
        </p>
        <a-tooltip slot="datetime" :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')">
          <span>{{ item.datetime.fromNow() }}</span>
        </a-tooltip>
      </a-comment>
    </a-list-item>
  </a-list>
</template>
<script>
import moment from 'moment'

export default {
  data () {
    return {
      data: [
        {
          actions: ['Reply to'],
          author: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          datetime: moment().subtract(1, 'days')
        },
        {
          actions: ['Reply to'],
          author: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          datetime: moment().subtract(2, 'days')
        }
      ],
      moment
    }
  }
}
</script>
<style>
#comment .ant-comment-content-author-name {
  color: greenyellow;
}
#comment-list .ant-list-header {
  color: indianred;
}
</style>
