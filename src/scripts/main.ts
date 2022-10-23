import { Test2 } from '../components/Test2'
import { TestCard } from '../components/TestCard'
import { TestComponent } from '../components/TestComponent'
import { App } from '../core'

const app = new App({
  imports: [TestComponent, TestCard, Test2],
})

app.renderDOM('#root', new TestCard())
