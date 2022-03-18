import NovoLeilao from '@/views/NovoLeilao.vue'
import { mount } from '@vue/test-utils'
import { createLeilao } from '@/http'


jest.mock('@/http')
const $router = {
  push: jest.fn()
}

const leilao = {
  produto: 'Celular',
  descricao: 'Um celular zerado!',
  valor: 2000,
}

describe('Um novo leilao deve ser criado', () => {
  test('dado um formulário preenchido deve ser criado um novo leilão', () => {
    createLeilao.mockResolvedValueOnce()

    const wrapper = mount(NovoLeilao, {
      mocks: $router
    })
    
    const produto = wrapper.find('.produto').setValue('Celular')
    const descricao = wrapper.find('.descricao').setValue('Um celular zerado!')
    const valor = wrapper.find('.valor').setValue(2000)
    wrapper.find('form').trigger('submit')

    expect(createLeilao).toBeCalled() 
  })
})
