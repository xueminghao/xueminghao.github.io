import React, { PureComponent } from 'react';
import './App.css';
import { Octokit } from '@octokit/rest'

export interface Post {
  id: number;
  title: string;
  body: string;
  html_url: string;
}

export interface IAppState {
  posts: Post[];
}

class App extends PureComponent<{}, IAppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      posts: [],
    }
  }

  componentDidMount(): void {
    this._loadPosts()
  }

  render(): JSX.Element {
    return <ol>
      {this.state.posts.map(post => {
        return <li key={post.id}>
          <a href={post.html_url}>
          {post.title}
          </a>
        </li>
      })}
    </ol>
  }

  _loadPosts(): void {
    const octokit = new Octokit({
      auth: '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',
      userAgent: 'blog client',
      baseUrl: 'https://api.github.com',
  
    })
    const owner = 'xueminghao'
    const repo = 'xueminghao.github.io'
    octokit.rest.issues.listForRepo({
      owner,
      repo,
    }).then(res => {
      if (res?.data) {
        const posts: Post[] = res.data.map((item) => {
          return {
            id: item.id,
            title: item.title,
            body: item.body,
            html_url: item.html_url
          } as Post
        })
        this.setState({
          posts: posts,
        })
      }
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
}

export default App;
