import Avaliador from '@/views/Avaliador'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { getLeiloes } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leilao = [
    {
        produto: 'Goiabada',
        lanceInicial: 200,
        descricao: 'Uma deliciosa goiabada'
    },{
        produto: 'celular',
        lanceInicial: 2002,
        descricao: 'Um celular novo'
    }
]


describe('Um avaliador que acessa a API', () => {
    test('Mostrar todos os leilões existentes', async () => {
        getLeiloes.mockResolvedValueOnce(leilao)
        
        const wrapper = mount(Avaliador, {
            stubs: { 
                RouterLink: RouterLinkStub
            }
        })
        await flushPromises()
        const listaLeiloes = wrapper.findAll('.leilao').length
        expect(listaLeiloes).toBe(leilao.length)
    })

    test('não há leilões retornados pela API', async () => {
        getLeiloes.mockResolvedValueOnce([])

        const wrapper = mount(Avaliador, {
            stubs:{
                RouterLink: RouterLinkStub
            }
        })
        await flushPromises()
        const listaLeiloes = wrapper.findAll('.leilao').length
        expect(listaLeiloes).toBe(0)
    })
})

