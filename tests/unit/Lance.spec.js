import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

test('Não aceita lance com valor menor do que zero', () => {
  const wrapper = mount(Lance)
  const input = wrapper.find('input')
  input.setValue(-100)
  wrapper.trigger('submit')
  const lancesEmitidos = wrapper.emitted('novo-lance')
  expect(lancesEmitidos).toBeUndefined()
})

test('Emite um lance quando o valor é maior que 0', () => {
  const wrapper = mount(Lance)
  const input = wrapper.find('input')
  input.setValue(100)
  wrapper.trigger('submit')
  const lancesEmitidos = wrapper.emitted('novo-lance')
  expect(lancesEmitidos).toHaveLength(1)
})

test('Emite o valor esperado de um lance válido', () => {
  const wrapper = mount(Lance)
  const input = wrapper.find('input')
  input.setValue(100)
  wrapper.trigger('submit')
  const lancesEmitidos = wrapper.emitted('novo-lance')
  const lance = parseInt(lancesEmitidos[0][0])
  expect(lance).toBe(100)
})

describe('Um lance com valor minimo', () => {
  test('todos os lances devem possuir um valor maior do que o mínimo informado', () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })
    const input = wrapper.find('input')
    input.setValue(400)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(lancesEmitidos).toHaveLength(1)
  })

  test('Emite o valor esperado de um lance válido', () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })
    const input = wrapper.find('input')
    input.setValue(400)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    const valorDoLance = parseInt(lancesEmitidos[0][0])
    expect(valorDoLance).toBe(400)
  })

  test('Não cadastra um lance com um valor menor do que o valor mínimo ', () => {
      const wrapper = mount(Lance, {
          propsData:{
              lanceMinimo: 1000
          }
      })
      const input = wrapper.find('input')
      input.setValue(800)
      wrapper.trigger('submit')
      const lancesEmitidos = wrapper.emitted('novo-lance')
      expect(lancesEmitidos).toBeUndefined()
  })

  test('Verificar se a mensagem de erro ao dar lance menor do que o mínimo está sendo exibida', async ()=>{
      const wrapper = mount(Lance, {
          propsData:{
              lanceMinimo: 1000
          }
      })
      const input = wrapper.find('input')
      input.setValue(800)
      wrapper.trigger('submit')
      await wrapper.vm.$nextTick()
      const msgErro = wrapper.find('p.alert').element
      expect(msgErro).toBeTruthy()
  })

  test('Verificar se a mensagem de erro ao dar lance menor do que o mínimo está sendo exibida corretamente', async () => {
    const wrapper = mount(Lance, {
        propsData:{
            lanceMinimo: 1000
        }
    })
    const input = wrapper.find('input')
    input.setValue(800)
    wrapper.trigger('submit')
    await wrapper.vm.$nextTick()
    const msgErro = wrapper.find('p.alert').element.textContent
    const msgEsperada = 'O valor mínimo para o lance é de 800'
    expect(msgEsperada).toContain(msgEsperada)
  })
})
