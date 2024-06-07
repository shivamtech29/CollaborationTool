import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs'; // Import forkJoin
import { map, mergeMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {
  private baseUrl = 'https://hacker-news.firebaseio.com/v0';
  private cachedTechStories: any[] | null = null;
  private cachedBlogPosts: any[] | null = null;

  constructor(private http: HttpClient) {}

  getTopStories(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/topstories.json`).pipe(
      map(ids => ids.slice(0, 500)) // Fetch top 50 stories to filter for tech news and blogs
    );
  }

  getItem(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/item/${id}.json`);
  }

  getTechStories(): Observable<any[]> {
    if (this.cachedTechStories) {
      return of(this.cachedTechStories);
    }

    return this.getTopStories().pipe(
      mergeMap(ids => {
        const itemObservables = ids.map(id => this.getItem(id));
        return forkJoin(itemObservables);
      }),
      map(stories => stories.filter(story =>
        story && story.title &&
        (story.title.toLowerCase().includes('tech') ||
         story.title.toLowerCase().includes('software') ||
         story.title.toLowerCase().includes('programming'))
      )),
      tap(stories => this.cachedTechStories = stories) // Cache the fetched stories
    );
  }

  getBlogPosts(): Observable<any[]> {
    if (this.cachedBlogPosts) {
      return of(this.cachedBlogPosts);
    }

    return this.getTopStories().pipe(
      mergeMap(ids => {
        const itemObservables = ids.map(id => this.getItem(id));
        return forkJoin(itemObservables);
      }),
      map(stories => stories.filter(story =>
        story && story.url && 
        (story.url.includes('medium.com') || story.url.includes('dev.to') || story.url.includes('blog'))
      )),
      tap(stories => this.cachedBlogPosts = stories) // Cache the fetched blog posts
    );
  }
}
