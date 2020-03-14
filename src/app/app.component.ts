import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="page_homepage fullParent">
      <div class="page_homepage__user" style="background-image: url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')">
        <div class="page_homepage__user--infos">
          <h1>William Nisole</h1>
          <h2>Junior Front-end developer</h2>
        </div>
      </div>
      <div class="page_homepage__articles fullParent">
        <div>
          <article class="page_homepage__article">
            <p class="page_homepage__article--infos">
              <span class="page_homepage__article--date">January 2015</span>
              <span class="page_homepage__article--theme">Work</span>
            </p>
            <p class="page_homepage__article--title">Lookbook, a shopify theme</p>
            <p class="page_homepage__article--description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda atque, autem consectetur corporis error facilis fugiat illo illum incidunt laborum, nesciunt obcaecati quae quis reprehenderit repudiandae, veniam veritatis voluptate! Quasi!</p>
            <a href="" class="page_homepage__article--link" data-text="Lire">Lire</a>
          </article>
          <article class="page_homepage__article">
            <p class="page_homepage__article--infos">
              <span class="page_homepage__article--date">January 2015</span>
              <span class="page_homepage__article--theme">Work</span>
            </p>
            <p class="page_homepage__article--title">Lookbook, a shopify theme</p>
            <p class="page_homepage__article--description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda atque, autem consectetur corporis error facilis fugiat illo illum incidunt laborum, nesciunt obcaecati quae quis reprehenderit repudiandae, veniam veritatis voluptate! Quasi!</p>
            <a href="" class="page_homepage__article--link" data-text="Lire">Lire</a>
          </article>
          <article class="page_homepage__article">
            <p class="page_homepage__article--infos">
              <span class="page_homepage__article--date">January 2015</span>
              <span class="page_homepage__article--theme">Work</span>
            </p>
            <p class="page_homepage__article--title">Lookbook, a shopify theme</p>
            <p class="page_homepage__article--description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda atque, autem consectetur corporis error facilis fugiat illo illum incidunt laborum, nesciunt obcaecati quae quis reprehenderit repudiandae, veniam veritatis voluptate! Quasi!</p>
            <a href="" class="page_homepage__article--link" data-text="Lire">Lire</a>
          </article>
          <article class="page_homepage__article">
            <p class="page_homepage__article--infos">
              <span class="page_homepage__article--date">January 2015</span>
              <span class="page_homepage__article--theme">Work</span>
            </p>
            <p class="page_homepage__article--title">Lookbook, a shopify theme</p>
            <p class="page_homepage__article--description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda atque, autem consectetur corporis error facilis fugiat illo illum incidunt laborum, nesciunt obcaecati quae quis reprehenderit repudiandae, veniam veritatis voluptate! Quasi!</p>
            <a href="" class="page_homepage__article--link" data-text="Lire">Lire</a>
          </article>
          <article class="page_homepage__article">
            <p class="page_homepage__article--infos">
              <span class="page_homepage__article--date">January 2015</span>
              <span class="page_homepage__article--theme">Work</span>
            </p>
            <p class="page_homepage__article--title">Lookbook, a shopify theme</p>
            <p class="page_homepage__article--description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda atque, autem consectetur corporis error facilis fugiat illo illum incidunt laborum, nesciunt obcaecati quae quis reprehenderit repudiandae, veniam veritatis voluptate! Quasi!</p>
            <a href="" class="page_homepage__article--link" data-text="Lire">Lire</a>
          </article>
          <article class="page_homepage__article">
            <p class="page_homepage__article--infos">
              <span class="page_homepage__article--date">January 2015</span>
              <span class="page_homepage__article--theme">Work</span>
            </p>
            <p class="page_homepage__article--title">Lookbook, a shopify theme</p>
            <p class="page_homepage__article--description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda atque, autem consectetur corporis error facilis fugiat illo illum incidunt laborum, nesciunt obcaecati quae quis reprehenderit repudiandae, veniam veritatis voluptate! Quasi!</p>
            <a href="" class="page_homepage__article--link" data-text="Lire">Lire</a>
          </article>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'blog';
}
