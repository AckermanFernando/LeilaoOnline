import Leiloeiro from '@/views/Leiloeiro'
import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'
import { getLeilao, getLances, createLance } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leilao = {
  produto: 'Goiabada',
  lanceInicial: 200,
  descricao: 'Uma deliciosa goiabada'
}

const lances = [
  {
    id: 1,
    valor: 3000,
    data: '2020-06-13T18:04:26.826Z',
    leilao_id: 1
  },
  {
    id: 2,
    valor: 1000,
    data: '2020-06-13T18:04:26.826Z',
    leilao_id: 1
  },
  {
    id: 3,
    valor: 1200,
    data: '2020-06-13T18:04:26.826Z',
    leilao_id: 1
  }
]

describe('Leiloeiro inicia um leilão que não possui lances', () => {
  test('Avisa quando não ouver lances ', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce([])

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    await flushPromises()

    const alerta = wrapper.find('.alert-dark')
    expect(alerta.exists()).toBe(true)
  })
})

describe('Leiloeiro comunica os valores de menor e maior lance', () => {
  test('Não mostra o aviso de sem lance', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    await flushPromises()

    const alert = wrapper.find('.alert-dark')
    expect(alert.exists()).toBe(false)
  })

  test('Possui uma lista de lances', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    await flushPromises()

    const alert = wrapper.find('.list-inline')
    expect(alert.exists()).toBe(true)
  })

  test('Menor lance é exibido ', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })
    
    await flushPromises()
    
    const menorLance = wrapper.find('.menor-lance')
    expect(menorLance.exists()).toBe(true)
    expect(menorLance.element.textContent).toContain('Menor lance: R$ 1000')
  })

  test('Mostra o maior lance do leilão', async () => {
      getLeilao.mockResolvedValueOnce(leilao)
      getLances.mockResolvedValueOnce(lances)

      const wrapper = mount(Leiloeiro, {
        propsData: {
            id: 1
        }
      })

      await flushPromises()

      const maiorLance = wrapper.find('.maior-lance')
      expect(maiorLance.exists()).toBe(true)
      expect(maiorLance.element.textContent).toContain(`Maior lance: R$ 3000`)
  })
})
