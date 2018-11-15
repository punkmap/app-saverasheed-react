import {
  initialState,
  handleChangeViewport,
  handleSelectEntity,
  handleDeselectEntity,
  handleEntityClick,
  handleClosePopup,
} from './reducer'

describe('map reducers', () => {
  it('handleChangeViewport works', () => {
    expect(
      handleChangeViewport(initialState, {
        payload: {
          viewport: {
            width: 1000,
            height: 1000,
          },
        },
      }),
    ).toEqual({
      ...initialState,
      viewport: {
        ...initialState.viewport,
        width: 1000,
        height: 1000,
      },
      isMapCentered: true,
    })
    expect(
      handleChangeViewport(initialState, { payload: { viewport: {} } }),
    ).toEqual({ ...initialState, isMapCentered: false })
  })

  it('handleSelectEntity works', () => {
    expect(
      handleSelectEntity(initialState, {
        payload: {
          entityId: '1',
        },
      }),
    ).toEqual({
      ...initialState,
      selectedEntities: ['1'],
    })

    expect(
      handleSelectEntity(
        { ...initialState, selectedEntities: ['1'] },
        {
          payload: {
            entityId: '1',
          },
        },
      ),
    ).toEqual({
      ...initialState,
      selectedEntities: ['1'],
    })

    expect(
      handleSelectEntity(
        { ...initialState, selectedEntities: ['1'] },
        {
          payload: {
            entityId: ['1', '2'],
          },
        },
      ),
    ).toEqual({
      ...initialState,
      selectedEntities: ['1', '2'],
    })
  })

  it('handleDeselectEntity works', () => {
    expect(
      handleDeselectEntity(
        { ...initialState, selectedEntities: ['1'] },
        {
          payload: {
            entityId: '1',
          },
        },
      ),
    ).toEqual({
      ...initialState,
      selectedEntities: [],
    })

    expect(
      handleDeselectEntity(
        { ...initialState, selectedEntities: ['1', '2', '3'] },
        {
          payload: {
            entityId: ['1', '2'],
          },
        },
      ),
    ).toEqual({
      ...initialState,
      selectedEntities: ['3'],
    })
  })

  it('handleEntityClick works', () => {
    expect(
      handleEntityClick(
        { ...initialState, selectedEntities: ['1'] },
        {
          payload: {
            entity: { object: { selected: true, quadKey: '1' }, x: 1, y: 1 },
          },
        },
      ),
    ).toEqual({
      ...initialState,
      selectedEntities: [],
      isMapCentered: true,
      popupOpen: false,
    })

    expect(
      handleEntityClick(
        { ...initialState, selectedEntities: ['122', '2', '3'] },
        {
          payload: {
            entity: {
              object: { selected: true, quadKey: '122' },
              place_name: 'Hello World',
            },
          },
        },
      ),
    ).toEqual({
      ...initialState,
      selectedEntities: ['2', '3'],
      isMapCentered: true,
      popupOpen: false,
    })

    expect(
      handleEntityClick(
        { ...initialState, selectedEntities: ['1', '2', '3'] },
        {
          payload: {
            entity: {
              object: {
                selected: false,
                quadKey: '122',
                name: 'Star of India',
                description: 'star of india',
                hint: 'star',
              },
            },
          },
        },
      ),
    ).toEqual({
      ...initialState,
      selectedEntities: ['122'],
      viewport: {
        ...initialState.viewport,
        latitude: 20.489949034810063,
        longitude: 22.5,
        transitionDuration: 500,
        zoom: 18,
      },
      popupInfo: {
        name: 'Star of India',
        description: 'star of india',
        hint: 'star',
      },
      isMapCentered: false,
      popupOpen: true,
    })
  })

  it('handleClosePopup works', () => {
    expect(
      handleClosePopup({
        ...initialState,
        popupInfo: {
          lat: 1,
          lng: 1,
        },
      }),
    ).toEqual({
      ...initialState,
    })
  })
})
