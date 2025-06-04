import { FormModel, model } from "./model.ts";
import { observer } from "mobx-react-lite";
import {Fragment, ReactNode, useState} from 'react';
import { Tooltip } from "antd";
import {DollarOutlined, MinusCircleOutlined, MoonOutlined, SunOutlined} from '@ant-design/icons';
import { Calculator } from "../calculator/calculator.tsx";
import { truncateNumber } from '../utils';
import { navigateController } from "./lib.ts";
import {useTheme} from '../theme';
import {ButtonUI, InputUI} from '../ui';
import {displayModel} from "../display/model.ts";

export const ServiceFeeComp = observer(() => {
  return (
    <div className='mb-3'>
      <h6>Обслуга</h6>
      <InputUI
        type='number'
        placeholder='Обслуга'
        value={model.serviceFee.value}
        onChange={(e) => model.serviceFee.setValue(Number(e.target.value))}
      />
    </div>
  )
})

export const Table = observer(() => {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <>
      <ServiceFeeComp />
      <div className='flex justify-between gap-2 mb-3'>
        <div className="flex gap-2">
          <ButtonUI onClick={model.addRow}>
            Добавить строку
          </ButtonUI>
          <ButtonUI onClick={model.addCol}>
            Добавить колонку
          </ButtonUI>
          <ButtonUI kind="danger" onClick={model.clearAll}>
            Очистить все
          </ButtonUI>
          <ButtonUI kind="danger" onClick={model.reset}>
            Удалить все
          </ButtonUI>
        </div>
        <ButtonUI kind="default" onClick={toggleTheme}>
          {theme === "light" ? <MoonOutlined /> : <SunOutlined />}
        </ButtonUI>
      </div>
      <div>
        {
          model.rows.map((cols, rowIdx) => {
            return (
              <Fragment key={rowIdx}>
                <div className="flex align-middle">
                  <div className='flex'>
                    {
                      cols.map((col, colIdx) => {
                        return (
                          <div key={col.key}>
                            {
                              rowIdx === 0 && (
                                <div className={`flex justify-center gap-2 ${colIdx === 0 ? 'opacity-0' : ''}`}>
                                  <Tooltip title={colIdx === 0 ? undefined : 'Удалить колонку'}>
                                    <MinusCircleOutlined onClick={() => model.removeCol(colIdx)} />
                                  </Tooltip>
                                  <Tooltip title={colIdx === 0 ? undefined : col.excludeServiceFee ? 'Включить обслугу' : 'Выключить обслугу'}>
                                    <DollarOutlined
                                      onClick={() => model.setColumnServiceFee(colIdx, !col.excludeServiceFee)}
                                      className={col.excludeServiceFee ? 'opacity-50' : ''}
                                    />
                                  </Tooltip>
                                </div>
                              )
                            }
                            <Border key={col.key}>
                              <InputUI
                                id={`input-${rowIdx}-${colIdx}`}
                                type="text"
                                value={col.value}
                                onChange={(e) => {
                                  model.setCell(rowIdx, colIdx, e.target.value);
                                }}
                                onKeyDown={navigateController}
                              />
                            </Border>
                          </div>
                        )
                      })
                    }
                    {
                      model.serviceFee.value > 0 && (
                        <div>
                          {
                            rowIdx === 0 && (
                              <div className='flex justify-center'>
                                <span className='leading-[10px]'>Обслуга</span><MinusCircleOutlined
                                style={{ opacity: 0 }} />
                              </div>
                            )
                          }
                          <Border>
                            <InputUI
                              type='text'
                              value={truncateNumber(model.serviceFeeSum[rowIdx])}
                              disabled
                              style={{
                                color: isDark ? "#e92f2f" : 'brown',
                              }}
                            />
                          </Border>
                        </div>
                      )
                    }
                    <div>
                      {
                        rowIdx === 0 && (
                          <div className='flex justify-center'>
                            <span className='leading-[10px]'>Итого</span>  <MinusCircleOutlined style={{ opacity: 0 }} />
                          </div>
                        )
                      }
                      <Border>
                        <InputUI
                          type='text'
                          value={truncateNumber(model.totalRowsSum[rowIdx])}
                          disabled
                          style={{
                            color: isDark ? '#00bb00' : "green",
                            backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "",
                          }}
                        />
                      </Border>
                    </div>
                  </div>
                  <MinusCircleOutlined
                    onClick={() => model.removeRow(rowIdx)}
                  />
                </div>
              </Fragment>
            )
          })
        }
        <h1 className='flex justify-end my-2'>Общая сумма: {truncateNumber(model.sum)}</h1>
      </div>
        {
            displayModel.calculator && <Calculator />
        }
    </>
  );
});

export function Border({ children }: { children: ReactNode }) {
  return (
    <div className='p-2 border border-black dark:border-[#5c5c5c]'>
      {children}
    </div>
  )
}

export const GenerateColumn = observer(() => {
  const [form] = useState(() => new FormModel())
  return (
    <div className='p-6 border border-black dark:border-white'>
      <h1 className='mb-2 text-center'>Генерация таблицы</h1>
      <div className="flex gap-2">
        <label>
          <div>Кол-во строк</div>
          <InputUI
            min={1}
            type="number"
            placeholder='Кол-во строк'
            value={form.rowsCount}
            onChange={e => form.setRowsCount(Number(e.target.value))} />
        </label>
        <label>
          <div>Кол-во колонок</div>
          <InputUI
            min={1}
            type="number"
            placeholder='Кол-во колонок'
            value={form.colsCount}
            onChange={e => form.setColsCount(Number(e.target.value))} />
        </label>
      </div>
      <div className="flex justify-end mt-3">
        <ButtonUI onClick={form.generate}>
          Генерировать
        </ButtonUI>
      </div>
    </div>
  )
})