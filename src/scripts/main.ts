import { TestComponent } from "../components/TestComponent";
import { App } from "../core/App";

const app = new App({
  imports: [TestComponent],
});

app.renderDOM("#root", new TestComponent({}));
