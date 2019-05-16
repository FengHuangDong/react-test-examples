describe('React Todo', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3000/',{waitUntil:'networkidle0'})
  })
  it('should add todo in list', async () => {
    const todoCounts = await page.$$eval('tbody tr', trs => trs.length);
    await page.type('.form-control', 'test');
    await page.click('.btn-success')
    await page.waitFor((counts) => document.querySelectorAll("tbody tr").length === counts + 1, {}, todoCounts)
    const newTodo = await page.$$eval('tbody tr', trs => trs[0].children[0].innerText);
    expect(newTodo).toEqual('test');
  })
  it('should click Completed filter', async () => {
    await page.click(".breadcrumb-item:nth-child(2)")
    await page.waitFor(() => document.querySelector(".breadcrumb-item:nth-child(2)").classList.contains("active"))
    const notCompletedTodo = await page.$$eval('tbody tr', trs => trs.filter(tr => tr.children[0].style.textDecoration !== 'line-through'))
    expect(notCompletedTodo.length).toEqual(0)
  })
  it('should click Active filter', async () => {
    await page.click(".breadcrumb-item:nth-child(3)")
    await page.waitFor(() => document.querySelector(".breadcrumb-item:nth-child(3)").classList.contains("active"))
    const completedTodo = await page.$$eval('tbody tr', trs => trs.filter(tr => tr.children[0].style.textDecoration === 'line-through'))
    expect(completedTodo.length).toEqual(0)
  })
  it('should change todo to completed', async () => {
    const todoText = await page.$eval('tbody tr:nth-child(1) td:nth-child(1)', td => td.innerText);
    await page.click("tbody tr:nth-child(1) .fa-check-circle")
    await page.waitFor(() => document.querySelector("tbody tr:nth-child(1)").children[0].style.textDecoration === 'line-through')
    const newTodoText = await page.$eval('tbody tr:nth-child(1) td:nth-child(1)', td => td.innerText);
    expect(newTodoText).toEqual(`${todoText} (completed)`);
  })
  it('should remove todo', async () => {
    const todoCounts = await page.$$eval('tbody tr', trs => trs.length);
    await page.click("tbody tr:nth-child(1) .fa-minus-circle")
    await page.waitFor((counts) => document.querySelectorAll("tbody tr").length === counts -1, {}, todoCounts)
    const newTodoCounts = await page.$$eval('tbody tr', trs => trs.length);
    expect(todoCounts).toEqual(newTodoCounts + 1)
  })
})